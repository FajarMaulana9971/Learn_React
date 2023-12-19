package com.fajarcodes.learn.Spring.with.React.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fajarcodes.learn.Spring.with.React.model.Student;

@Repository
public interface StudentRepositories extends JpaRepository<Student, Integer> {
    public Optional<Student> findByName(String name);

    // public Optional<Student> findByEmail(String email);

}
