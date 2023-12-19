package com.fajarcodes.learn.Spring.with.React.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fajarcodes.learn.Spring.with.React.model.dto.request.EmailRequest;
import com.fajarcodes.learn.Spring.with.React.service.EmailService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/email")
public class EmailController {

    private EmailService emailService;

    @PostMapping("/simple")
    public EmailRequest sendSimpleEmail(@RequestBody EmailRequest emailRequest) {
        return emailService.sendSimpleMessage(emailRequest);
    }

    @PostMapping("/atth")
    public EmailRequest sendEmailWithAttachment(@RequestBody EmailRequest emailRequest) {
        return emailService.sendEmailWithAttachment(emailRequest);
    }
}
