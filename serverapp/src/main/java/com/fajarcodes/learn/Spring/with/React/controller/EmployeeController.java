package com.fajarcodes.learn.Spring.with.React.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fajarcodes.learn.Spring.with.React.model.Employee;
import com.fajarcodes.learn.Spring.with.React.model.dto.request.EmployeeRequest;
import com.fajarcodes.learn.Spring.with.React.service.EmployeeService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/employee")
public class EmployeeController {
    private EmployeeService employeeService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public Employee getById(@PathVariable Integer id) {
        return employeeService.getById(id);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Integer id, @RequestBody Employee employee) {
        return employeeService.update(id, employee);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public Employee delete(@PathVariable Integer id) {
        return employeeService.delete(id);
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return employeeService.create(employee);
    }

    @PostMapping("/dto")
    public Employee createWithDto(@RequestBody EmployeeRequest employee) {
        return employeeService.createWithDto(employee);
    }
}
