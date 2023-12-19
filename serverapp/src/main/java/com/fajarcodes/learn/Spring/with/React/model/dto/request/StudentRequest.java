package com.fajarcodes.learn.Spring.with.React.model.dto.request;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StudentRequest {
    private Integer id;
    private String name;
    private Date dateOfBirth;
    private String email;
    private String phone;
    private String cardNumber;
    private Date issueDate;
}
