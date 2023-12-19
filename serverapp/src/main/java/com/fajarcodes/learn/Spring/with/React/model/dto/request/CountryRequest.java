package com.fajarcodes.learn.Spring.with.React.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CountryRequest {
    private String code;
    private String name;
    private Integer regionId;
}
