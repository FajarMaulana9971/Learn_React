package com.fajarcodes.learn.Spring.with.React.model;

import java.util.Date;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(nullable = false)
    private Date dateOfBirth;

    @Column(length = 30, nullable = false)
    private String email;

    @Column(length = 15, nullable = false)
    private String phone;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_card_id", referencedColumnName = "id")
    private IdCard idCard;

}
