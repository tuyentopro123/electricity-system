package pricing;

import com.example.quality_insurance.dto.pricing.CreatePricingDto;
import com.example.quality_insurance.dto.pricing.MultiCreatePricingDto;
import com.example.quality_insurance.entity.Pricing;
import com.example.quality_insurance.repository.PricingRepository;
import com.example.quality_insurance.service.PricingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PricingServiceTest {

    @Mock
    private PricingRepository pricingRepository;

    @InjectMocks
    private PricingService pricingService;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllConfig() {
        // Given
        Pricing latestPricing = new Pricing();
        latestPricing.setUpdateNumber(1);
        List<Pricing> expectedPricingList = List.of(
                new Pricing(),
                new Pricing()
        );

        when(pricingRepository.getLatestPricing()).thenReturn(latestPricing);
        when(pricingRepository.getPricingByUpdateNumber(1)).thenReturn(expectedPricingList);

        // When
        List<Pricing> actualPricingList = pricingService.getAllConfig();

        // Then
        assertEquals(expectedPricingList, actualPricingList);
        verify(pricingRepository).getLatestPricing();
        verify(pricingRepository).getPricingByUpdateNumber(1);
    }

    @Test
    void testCreatePricingConfig() {
        // Given
        CreatePricingDto dto1 = new CreatePricingDto();
        dto1.setLevel("Level 1");
        dto1.setPrice(100.0);
        dto1.setFromNumber(0);
        dto1.setToNumber(50);

        CreatePricingDto dto2 = new CreatePricingDto();
        dto2.setLevel("Level 2");
        dto2.setPrice(200.0);
        dto2.setFromNumber(51);
        dto2.setToNumber(100);

        MultiCreatePricingDto multiCreatePricingDto = new MultiCreatePricingDto();
        multiCreatePricingDto.setData(new CreatePricingDto[]{dto1, dto2});

        Pricing latestPricing = new Pricing();
        latestPricing.setUpdateNumber(1);
        when(pricingRepository.getLatestPricing()).thenReturn(latestPricing);

        List<Pricing> expectedPricings = List.of(
                new Pricing(null, "Level 1", 0, 50, 100.0, 2, null, null),
                new Pricing(null, "Level 2", 51, 100, 200.0, 2, null, null)
        );

        // When
        List<Pricing> actualPricings = pricingService.createPricingConfig(multiCreatePricingDto);

        // Then
        assertEquals(expectedPricings, actualPricings);
        verify(pricingRepository, times(1)).saveAll(actualPricings);
    }
}
