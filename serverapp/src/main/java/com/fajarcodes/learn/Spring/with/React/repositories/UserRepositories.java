package com.fajarcodes.learn.Spring.with.React.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fajarcodes.learn.Spring.with.React.model.User;

@Repository
public interface UserRepositories extends JpaRepository<User, Integer> {

}
