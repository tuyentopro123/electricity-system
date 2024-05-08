package pricing;

import com.example.quality_insurance.configuration.BeanConfiguration;
import com.example.quality_insurance.entity.Customer;
import com.example.quality_insurance.entity.Pricing;
import com.example.quality_insurance.repository.CustomerRepository;
import com.example.quality_insurance.repository.PricingRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class BeanConfigurationTest {

    @Mock
    private PricingRepository pricingRepository;

    @Mock
    private CustomerRepository customerRepository;

    @InjectMocks
    private BeanConfiguration beanConfiguration;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCalculate() {
        // Given
        double number = 10;
        double currentPrice = 0;
        double price = 2;
        int maxValue = 5;

        // When
        List<Double> result = beanConfiguration.calculate(number, currentPrice, price, maxValue);

        // Then
        assertEquals(5, result.get(0)); // Số lượng còn lại
        assertEquals(10, result.get(1)); // Giá hiện tại
    }

    @Test
    void testCalculatePricing() {
        // Given
        Pricing latestPricing = new Pricing();
        latestPricing.setUpdateNumber(1);
        List<Pricing> pricings = List.of(
                new Pricing(1L, "Level 1", 0, 5, 2.0, 1, new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis())),
                new Pricing(2L, "Level 2", 6, 10, 3.0, 1, new Date(System.currentTimeMillis()), new Date(System.currentTimeMillis()))
        );

        when(pricingRepository.getLatestPricing()).thenReturn(latestPricing);
        when(pricingRepository.getPricingByUpdateNumber(latestPricing.getUpdateNumber()))
                .thenReturn(pricings);

        double number = 8;

        // When
        double result = beanConfiguration.calculatePricing(number);

        // Then
        assertEquals(18, result);
    }

    @Test
    void testAddInitPricingLevel() {
        // Given
        when(pricingRepository.findAll()).thenReturn(List.of());

        // When
        boolean result = beanConfiguration.addInitPricingLevel();

        // Then
        assertTrue(result);
        verify(pricingRepository, times(1)).saveAll(anyList());
    }

    @Test
    void testAddInitCustomer() {
        // Given
        when(customerRepository.findAll()).thenReturn(List.of());
        Pricing pricing = new Pricing();
        pricing.setUpdateNumber(0);
        when(pricingRepository.getLatestPricing()).thenReturn(pricing);
        when(pricingRepository.getPricingByUpdateNumber(0)).thenReturn(List.of(new Pricing()));
        // When
        boolean result = beanConfiguration.addInitCustomer();

        // Then
        assertTrue(result);
        verify(customerRepository, times(1)).saveAll(anyList());
    }
}

