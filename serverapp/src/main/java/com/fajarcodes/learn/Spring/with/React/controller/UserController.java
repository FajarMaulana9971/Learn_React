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

import com.fajarcodes.learn.Spring.with.React.model.User;
import com.fajarcodes.learn.Spring.with.React.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<User> getAll() {
        return userService.getAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public User getById(@PathVariable Integer id) {
        return userService.getById(id);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.create(user);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Integer id, @RequestBody User user) {
        return userService.update(id, user);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public User delete(@PathVariable Integer id) {
        return userService.delete(id);
    }
}
