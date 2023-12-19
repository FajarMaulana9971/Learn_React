package com.fajarcodes.learn.Spring.with.React.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRequest {
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String username;
    private String password;
    private Boolean isEnabled;
}
