package com.fajarcodes.learn.Spring.with.React.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fajarcodes.learn.Spring.with.React.model.Region;

@Repository
public interface RegionRepositories extends JpaRepository<Region, Integer> {

    // ini namanya query method
    public Optional<Region> findByName(String name);
}
