package com.fajarcodes.learn.Spring.with.React.service;

import java.io.File;

import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.fajarcodes.learn.Spring.with.React.model.dto.request.EmailRequest;

import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {

    private JavaMailSender javaMailSender;

    public EmailRequest sendSimpleMessage(EmailRequest request) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(request.getTo());
        message.setSubject(request.getSubject());
        message.setText(request.getText());
        javaMailSender.send(message);
        return request;
    }

    public EmailRequest sendEmailWithAttachment(EmailRequest emailRequest) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

            helper.setTo(emailRequest.getTo());
            helper.setText(emailRequest.getText());
            helper.setSubject(emailRequest.getSubject());

            FileSystemResource file = new FileSystemResource(
                    new File(emailRequest.getAttachment()));

            helper.addAttachment(file.getFilename(), file);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            System.out.println("System error" + e.getMessage());
        }
        return emailRequest;
    }
}
