package auth;

import com.example.quality_insurance.auth.*;
import com.example.quality_insurance.entity.User;
import com.example.quality_insurance.entity.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthenticationControllerTest {

    @Mock
    private UserRepository repository;
    @Mock
    private AuthenticationService authenticationService;

    @InjectMocks
    private AuthenticationController authenticationController;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(authenticationController).build();
    }

    @Test
    void testRegister() throws Exception {
        RegisterRequest request = new RegisterRequest("John", "Doe", "john.doe@example.com", "password");
        AuthenticationResponse response = new AuthenticationResponse("token", null);
        when(authenticationService.register(request)).thenReturn(response);

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(authenticationService, times(1)).register(request);
    }

    @Test
    void testLogin() throws Exception {
        AuthenticateRequest request = new AuthenticateRequest("vuvankhanh1@gmail.com", "123456");
        User user = new User();

        AuthenticationResponse response = new AuthenticationResponse("token", user);
        when(authenticationService.authenticate(request)).thenReturn(response);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk());

        verify(authenticationService, times(1)).authenticate(request);
    }
}
