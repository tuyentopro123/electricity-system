package com.example.quality_insurance.service;

import com.example.quality_insurance.entity.EmailTemplate;
import com.example.quality_insurance.repository.EmailTemplateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmailTemplateService {
    private final EmailTemplateRepository repository;

    public List<EmailTemplate> getAllTemplates() {
        return this.repository.findAll();
    }

}
