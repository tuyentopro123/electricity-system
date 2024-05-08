package auth;

import com.example.quality_insurance.auth.AuthenticateRequest;
import com.example.quality_insurance.auth.AuthenticationResponse;
import com.example.quality_insurance.auth.AuthenticationService;
import com.example.quality_insurance.auth.RegisterRequest;
import com.example.quality_insurance.configuration.JwtService;
import com.example.quality_insurance.entity.Role;
import com.example.quality_insurance.entity.User;
import com.example.quality_insurance.entity.UserRepository;
import com.example.quality_insurance.exception.DuplicatedException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterSuccess() {
        RegisterRequest request = new RegisterRequest("John", "Doe", "john1.doe@example.com", "password");
        User user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .fullname(String.format("%s %s", request.getFirstname(), request.getLastname()))
                .email(request.getEmail())
                .password("encodedPassword")
                .role(Role.USER)
                .build();

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(jwtService.generateToken(user)).thenReturn("token");
        when(userRepository.save(any(User.class))).thenReturn(user);

        AuthenticationResponse response = authenticationService.register(request);

        assertNotNull(response);
        assertEquals("token", response.getToken());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegisterEmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest("John", "Doe", "john.doe@example.com", "password");
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(new User()));

        assertThrows(DuplicatedException.class, () -> authenticationService.register(request));
    }

    @Test
    void testAuthenticateSuccess() {
        AuthenticateRequest request = new AuthenticateRequest("john.doe@example.com", "password");
        User user = User.builder()
                .email(request.getEmail())
                .password("encodedPassword")
                .build();

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(user));
        when(jwtService.generateToken(user)).thenReturn("token");

        authenticationService.authenticate(request);

        verify(authenticationManager, times(1)).authenticate(any());
        assertEquals("token", authenticationService.authenticate(request).getToken());
    }

    @Test
    void testAuthenticateFailure() {
        AuthenticateRequest request = new AuthenticateRequest("john.doe@example.com", "wrongpassword");
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());

        assertThrows(Exception.class, () -> authenticationService.authenticate(request));
    }
}
