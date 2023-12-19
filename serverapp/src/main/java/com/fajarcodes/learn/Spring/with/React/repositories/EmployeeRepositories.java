package com.fajarcodes.learn.Spring.with.React.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fajarcodes.learn.Spring.with.React.model.Employee;

@Repository
public interface EmployeeRepositories extends JpaRepository<Employee, Integer> {

}
