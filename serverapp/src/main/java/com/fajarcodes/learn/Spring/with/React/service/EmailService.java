package com.fajarcodes.learn.Spring.with.React.service;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import com.fajarcodes.learn.Spring.with.React.model.dto.request.EmailRequest;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmailService {

    private JavaMailSender javaMailSender;
    private SpringTemplateEngine springTemplateEngine;

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

    public EmailRequest sendMessageWithHtml(EmailRequest emailRequest) {
        sendMessageWithHtml(new HashMap<String, Object>() {
            {
                put("username", emailRequest.getTo().split("@")[0].replace(".", " "));
                put("text", emailRequest.getText());
            }
        }, "emails/newsletter", emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getAttachment());

        return emailRequest;

    }

    public void sendMessageWithHtml(Map<String, Object> variables, String template, String to, String subject,
            String attachment) {
        MimeMessage message = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            helper.setTo(to);
            helper.setSubject(subject);

            Context context = new Context();
            context.setVariables(variables);

            String html = springTemplateEngine.process(template, context);
            helper.setText(html, true);

            if (attachment != null) {
                FileSystemResource file = new FileSystemResource(new File(attachment));
                helper.addAttachment(file.getFilename(), file);
            }

            javaMailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }
}
