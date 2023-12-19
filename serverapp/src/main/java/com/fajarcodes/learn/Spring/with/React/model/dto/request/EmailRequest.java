package com.fajarcodes.learn.Spring.with.React.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailRequest {
    private String to;
    private String subject;
    private String text;
    private String attachment;
}
