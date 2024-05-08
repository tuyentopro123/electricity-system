package Customer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

import com.example.quality_insurance.dto.customer.CustomerExportExcel;
import com.example.quality_insurance.dto.customer.CustomerSendingMail;
import com.example.quality_insurance.entity.Customer;
import com.example.quality_insurance.entity.EmailTemplate;
import com.example.quality_insurance.exception.InvalidException;
import com.example.quality_insurance.exception.NotFoundException;
import com.example.quality_insurance.exception.Response;
import com.example.quality_insurance.repository.CustomerRepository;
import com.example.quality_insurance.repository.EmailTemplateRepository;
import com.example.quality_insurance.service.CustomerService;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.ui.Model;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;

class CustomerServiceTest {

    @InjectMocks
    private CustomerService customerService;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private JavaMailSender mailSender;

    @Mock
    private TemplateEngine templateEngine;

    @Mock
    private EmailTemplateRepository emailTemplateRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllCustomers() {
        // Chuẩn bị dữ liệu giả
        Customer customer1 = new Customer();
        customer1.setId(1000L);
        customer1.setNumberUpdate(new Date());

        Customer customer2 = new Customer();
        customer2.setId(1001L);
        customer2.setNumberUpdate(new Date());

        List<Customer> mockCustomers = Arrays.asList(
                customer1, customer2
        );
        when(customerRepository.filterCustomers(5)).thenReturn(mockCustomers);

        // Gọi phương thức
        List<Customer> result = customerService.getAllCustomers(5);

        // Kiểm tra kết quả
        assertEquals(mockCustomers.size(), result.size());
        assertEquals(mockCustomers.get(0).getName(), result.get(0).getName());
    }

    @Test
    void testSendingMails() {
        // Chuẩn bị dữ liệu giả
        String[] emails = new String[1];
        emails[0] = "vuvankhanh02122002@gmail.com";
        CustomerSendingMail request = new CustomerSendingMail(1, emails);
        EmailTemplate mockTemplate = new EmailTemplate(1L, "cat-dien", "cat-dien", null, null);
        Customer mockCustomer1 = new Customer();
        mockCustomer1.setId(701L);
        mockCustomer1.setEmail("vuvankhanh02122002@gmail.com");
        mockCustomer1.setName("khanh");
        mockCustomer1.setNumberUpdate(new Date());

        when(emailTemplateRepository.findById(1L)).thenReturn(Optional.of(mockTemplate));
        when(customerRepository.findOneByEmail(anyString())).thenReturn(Optional.of(mockCustomer1));
        when(mailSender.createMimeMessage()).thenReturn(mock(MimeMessage.class));

        // Giả lập phương thức xử lý gửi email
        doNothing().when(mailSender).send(any(MimeMessage.class));

        // Gọi phương thức
        Response response = customerService.sendingMails(request);

        // Kiểm tra phản hồi
        assertEquals("success", response.getStatus());
        assertEquals("Mails have been sending...", response.getMessage());
    }

    @Test
    void testExportToExcel() {
        // Chuẩn bị dữ liệu giả
        Customer customer1 = new Customer();
        customer1.setId(999L);
        customer1.setName("John Doe");
        List<Customer> customers = List.of(customer1);
        when(customerRepository.findAllById(anyList())).thenReturn(customers);

        // Tạo yêu cầu
        long[] ids = {999L};
        CustomerExportExcel request = new CustomerExportExcel("Test Header", ids);

        // Gọi phương thức
        ResponseEntity<byte[]> response = customerService.exportToExcel(request);

        // Kiểm tra phản hồi
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals(MediaType.APPLICATION_OCTET_STREAM, response.getHeaders().getContentType());
    }
}
