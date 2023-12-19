package com.fajarcodes.learn.Spring.with.React.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fajarcodes.learn.Spring.with.React.model.Country;

@Repository
public interface CountryRepositories extends JpaRepository<Country, Integer> {
    public Boolean existsByName(String name);
}
