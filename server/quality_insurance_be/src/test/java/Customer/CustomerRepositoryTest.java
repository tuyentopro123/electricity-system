package Customer;

import com.example.quality_insurance.QualityInsuranceApplication;
import com.example.quality_insurance.entity.Customer;
import com.example.quality_insurance.repository.CustomerRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(classes = QualityInsuranceApplication.class)
public class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    void testFilterCustomers() {
        // Giả sử số liệu cập nhật trong tháng 5
        int month = 5;

        // Tạo thêm một khách hàng có ngày cập nhật trong tháng 5
        Customer customer = Customer.builder()
                .email("test3@example.com")
                .name("Customer 3")
                .numberUpdate(new Date())  // Thay đổi số liệu để phù hợp với tháng bạn đang kiểm tra
                .isActive(true)
                .build();
        customerRepository.save(customer);

        // Gọi phương thức filterCustomers với tháng 5
        List<Customer> filteredCustomers = customerRepository.filterCustomers(month);

        // Kiểm tra danh sách khách hàng có chứa khách hàng vừa tạo
        assertThat(filteredCustomers).hasSize(1);
        assertThat(filteredCustomers.get(0).getEmail()).isEqualTo("test3@example.com");
    }

    @Test
    void testFindOneByEmail() {
        // Create test data
        Customer customer = new Customer();
        customer.setName("John Doe");
        customer.setEmail("john@example.com");
        customerRepository.save(customer);

        // Test the findOneByEmail method
        Optional<Customer> foundCustomer = customerRepository.findOneByEmail("john@example.com");
        assertTrue(foundCustomer.isPresent());
        assertEquals("John Doe", foundCustomer.get().getName());
    }
}
