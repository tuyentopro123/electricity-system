package Customer;

import com.example.quality_insurance.QualityInsuranceApplication;
import com.example.quality_insurance.controller.CustomerController;
import com.example.quality_insurance.dto.customer.CustomerExportExcel;
import com.example.quality_insurance.dto.customer.CustomerSendingMail;
import com.example.quality_insurance.entity.Customer;
import com.example.quality_insurance.exception.Response;
import com.example.quality_insurance.service.CustomerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class CustomerControllerTest {

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private CustomerController customerController;

    private MockMvc mockMvc;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(customerController).build();
    }

    @Test
    void testGetAllCustomers() throws Exception {
        // Given
        List<Customer> customers = List.of(new Customer());
        when(customerService.getAllCustomers(1)).thenReturn(customers);
        // When & Then
        mockMvc.perform(get("/customers?month=1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(customers.size()));
        System.out.println(customers.size());

        verify(customerService).getAllCustomers(1);
    }

    @Test
    void testSendingMails() throws Exception {
        // Given
        CustomerSendingMail sendingMail = new CustomerSendingMail(1, new String[]{"test@example.com"});
        Response response = new Response("success", "Mails have been sending...");

        when(customerService.sendingMails(sendingMail)).thenReturn(response);

        // When & Then
        mockMvc.perform(post("/customers/sending-mails")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"templateId\": 1, \"emails\": [\"test@example.com\"]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"))
                .andExpect(jsonPath("$.message").value("Mails have been sending..."));

        verify(customerService).sendingMails(sendingMail);
    }

    @Test
    void testExportToExcel() throws Exception {
        // Given
        long[] ids = {1L, 2L};
        CustomerExportExcel exportExcel = new CustomerExportExcel("Header", ids);

        when(customerService.exportToExcel(exportExcel)).thenReturn(ResponseEntity.ok(new byte[0]));

        // When & Then
        mockMvc.perform(post("/customers/export-to-excel")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"header\": \"Header\", \"ids\": [1, 2]}"))
                .andExpect(status().isOk());

        verify(customerService).exportToExcel(exportExcel);
    }
}
