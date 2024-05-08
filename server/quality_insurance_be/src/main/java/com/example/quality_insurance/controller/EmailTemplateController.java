package com.example.quality_insurance.controller;

import com.example.quality_insurance.entity.EmailTemplate;
import com.example.quality_insurance.service.EmailTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("email-template")
@RequiredArgsConstructor
public class EmailTemplateController {
    private final EmailTemplateService service;

    @GetMapping()
    public List<EmailTemplate> getAllEmailTemplates() {
        return this.service.getAllTemplates();
    }

}
