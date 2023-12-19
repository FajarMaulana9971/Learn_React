package com.fajarcodes.learn.Spring.with.React.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fajarcodes.learn.Spring.with.React.model.Employee;
import com.fajarcodes.learn.Spring.with.React.model.User;
import com.fajarcodes.learn.Spring.with.React.model.dto.request.EmployeeRequest;
import com.fajarcodes.learn.Spring.with.React.repositories.EmployeeRepositories;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class EmployeeService {
    private EmployeeRepositories employeeRepositories;
    private UserService userService;

    public List<Employee> getAll() {
        return employeeRepositories.findAll();
    }

    public Employee getById(Integer id) {
        return employeeRepositories
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "employee id is not found"));
    }

    public Employee update(Integer id, Employee employee) {
        getById(id);
        employee.setId(id);
        return employeeRepositories.save(employee);
    }

    public Employee delete(Integer id) {
        Employee employee = getById(id);
        employeeRepositories.delete(employee);
        return employee;
    }

    public Employee create(Employee employee) {
        return employeeRepositories.save(employee);
    }

    public Employee createWithDto(EmployeeRequest employeeRequest) {
        Employee employee = new Employee();
        employee.setName(employeeRequest.getName());
        employee.setEmail(employeeRequest.getEmail());
        employee.setPhone(employeeRequest.getPhone());

        User user = new User();
        user.setUsername(employeeRequest.getUsername());
        user.setPassword(employeeRequest.getPassword());
        user.setIsEnabled(employeeRequest.getIsEnabled());

        user.setEmployee(employee);

        employee.setUser(user);

        return employeeRepositories.save(employee);

    }
}
