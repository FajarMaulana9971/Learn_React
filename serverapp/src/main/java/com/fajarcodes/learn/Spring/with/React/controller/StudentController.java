package com.fajarcodes.learn.Spring.with.React.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fajarcodes.learn.Spring.with.React.model.Student;
import com.fajarcodes.learn.Spring.with.React.model.dto.request.StudentRequest;
import com.fajarcodes.learn.Spring.with.React.service.StudentService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/student")
public class StudentController {
    private StudentService studentService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Student> getAll() {
        return studentService.getAll();
    }

    @GetMapping("/{id}")
    public Student getById(@PathVariable Integer id) {
        return studentService.getById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public Student create(@RequestBody Student student) {
        return studentService.create(student);
    }

    // create with dto
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/dto")
    public Student createWithDTO(@RequestBody StudentRequest request) {
        return studentService.createWithDto(request);
    }
    // create with dto end

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public Student update(@PathVariable Integer id, @RequestBody Student student) {
        return studentService.update(id, student);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public Student delete(@PathVariable Integer id) {
        return studentService.delete(id);
    }
}
