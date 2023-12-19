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

import com.fajarcodes.learn.Spring.with.React.model.Region;
import com.fajarcodes.learn.Spring.with.React.service.RegionService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/region")
public class RegionController {
    private RegionService regionService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Region> getAll() {
        return regionService.getAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public Region getById(@PathVariable Integer id) {
        return regionService.getById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public Region createRegion(@RequestBody Region region) {
        return regionService.create(region);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public Region updateRegion(@PathVariable Integer id, @RequestBody Region region) {
        return regionService.update(id, region);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public Region deleteRegion(@PathVariable Integer id) {
        return regionService.delete(id);
    }
}
