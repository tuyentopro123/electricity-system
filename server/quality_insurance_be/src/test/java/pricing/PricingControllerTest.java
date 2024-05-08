package pricing;

import com.example.quality_insurance.controller.PricingController;
import com.example.quality_insurance.dto.pricing.CreatePricingDto;
import com.example.quality_insurance.dto.pricing.MultiCreatePricingDto;
import com.example.quality_insurance.entity.Pricing;
import com.example.quality_insurance.service.PricingService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class PricingControllerTest {

    @Mock
    private PricingService pricingService;

    @InjectMocks
    private PricingController pricingController;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllConfig() {
        // Given
        List<Pricing> expectedPricingList = List.of(
                new Pricing(),
                new Pricing()
        );

        when(pricingService.getAllConfig()).thenReturn(expectedPricingList);

        // When
        List<Pricing> actualPricingList = pricingController.getAllConfig();

        // Then
        assertEquals(expectedPricingList, actualPricingList);
        verify(pricingService).getAllConfig();
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

        List<Pricing> expectedPricings = List.of(
                new Pricing(null, "Level 1", 0, 50, 100.0, 2, null, null),
                new Pricing(null, "Level 2", 51, 100, 200.0, 2, null, null)
        );

        when(pricingService.createPricingConfig(multiCreatePricingDto)).thenReturn(expectedPricings);

        // When
        List<Pricing> actualPricings = pricingController.createPricingConfig(multiCreatePricingDto);

        // Then
        assertEquals(expectedPricings, actualPricings);
        verify(pricingService).createPricingConfig(multiCreatePricingDto);
    }
}
