package com.fajarcodes.learn.Spring.with.React.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.server.ResponseStatusException;

import com.fajarcodes.learn.Spring.with.React.model.Employee;
import com.fajarcodes.learn.Spring.with.React.model.User;
import com.fajarcodes.learn.Spring.with.React.repositories.EmployeeRepositories;
import com.fajarcodes.learn.Spring.with.React.repositories.UserRepositories;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepositories userRepositories;
    private EmployeeRepositories employeeRepositories;

    public List<User> getAll() {
        return userRepositories.findAll();
    }

    public User getById(Integer id) {
        return userRepositories.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "user with that id is not found"));
    }

    public User create(User user) {
        if (user.getEmployee() == null) {
            // Misalnya, ambil data Employee dari repository dan atur ke User jika belum ada
            Employee defaultEmployee = employeeRepositories.findById(user.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Default Employee not found"));
            user.setEmployee(defaultEmployee);
        }

        return userRepositories.save(user);
    }

    public User update(Integer id, User user) {
        getById(id);
        user.setId(id);
        return userRepositories.save(user);
    }

    public User delete(Integer id) {
        User user = getById(id);
        userRepositories.delete(user);
        return user;
    }
}
