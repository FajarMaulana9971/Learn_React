package com.fajarcodes.learn.Spring.with.React.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fajarcodes.learn.Spring.with.React.model.IdCard;
import com.fajarcodes.learn.Spring.with.React.model.Student;
import com.fajarcodes.learn.Spring.with.React.model.dto.request.StudentRequest;
import com.fajarcodes.learn.Spring.with.React.repositories.StudentRepositories;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class StudentService {

    private StudentRepositories studentRepositories;

    // public List<Student> getAll() {
    // try {
    // return studentRepositories.findAll();
    // } catch (Exception e) {
    // e.printStackTrace();
    // throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "failed
    // to fetch data");
    // }
    // }

    public List<Student> getAll() {
        return studentRepositories.findAll();
    }

    public Student getById(Integer id) {
        return studentRepositories.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student id is not found"));
    }

    public Student create(Student student) {
        if (studentRepositories.findByName(student.getName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "name already exist");
        }

        // if (studentRepositories.findByEmail(student.getEmail()).isPresent()) {
        // throw new ResponseStatusException(HttpStatus.CONFLICT, "email must not be
        // same");
        // }
        return studentRepositories.save(student);
    }

    public Student createWithDto(StudentRequest request) {
        Student student = new Student();
        student.setName(request.getName());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setEmail(request.getEmail());
        student.setPhone(request.getPhone());

        IdCard idCard = new IdCard();
        idCard.setCardNumber(request.getCardNumber());
        idCard.setIssueDate(request.getIssueDate());

        student.setIdCard(idCard);

        return studentRepositories.save(student);
    }

    public Student update(Integer id, Student student) {
        getById(id);
        student.setId(id);
        return studentRepositories.save(student);
    }

    public Student delete(Integer id) {
        Student student = getById(id);
        studentRepositories.delete(student);
        return student;
    }
}
