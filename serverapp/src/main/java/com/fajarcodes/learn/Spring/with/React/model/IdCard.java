package com.fajarcodes.learn.Spring.with.React.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "tb_idCard")
public class IdCard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "card_number", nullable = false, length = 10)
    private String cardNumber;

    @Column(name = "issue_date", nullable = false)
    private Date issueDate;

    @OneToOne(mappedBy = "idCard")
    // harus pake JsonProperty itu dikarenakan salah satu relasi entah student atau
    // idCard terjadi infinity looping
    // ibarat kita mengstop agar tidak mengambil data yang berlebihan
    // jadi ibarat itu seperti misal kita memanggil student dan student memanggil
    // idCard. lalu idCard memanggil student dan seterusnya (infinity looping)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Student student;
}
