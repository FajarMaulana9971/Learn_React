package com.fajarcodes.learn.Spring.with.React.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "tb_country")
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "country_id")
    private Integer id;

    @Column(name = "country_code", length = 2, unique = true, nullable = false)
    private String code;

    @Column(name = "country_name", nullable = false, unique = true, length = 20)
    private String name;

    @ManyToOne
    @JoinColumn(name = "region_id", nullable = false)
    private Region region;
}
