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

import com.fajarcodes.learn.Spring.with.React.model.Country;
import com.fajarcodes.learn.Spring.with.React.model.dto.request.CountryRequest;
import com.fajarcodes.learn.Spring.with.React.service.CountryService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/country")
public class CountryController {
    private CountryService countryService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public List<Country> getAll() {
        return countryService.getAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public Country getById(@PathVariable Integer id) {
        return countryService.getById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping()
    public Country createCountry(@RequestBody Country country) {
        return countryService.create(country);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/dto")
    public Country createCountryWithDto(@RequestBody CountryRequest countryRequest) {
        return countryService.createWithDto(countryRequest);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/{id}")
    public Country updateCountry(@PathVariable Integer id, @RequestBody CountryRequest countryRequest) {
        return countryService.update(id, countryRequest);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/{id}")
    public Country deleteCountry(@PathVariable Integer id) {
        return countryService.delete(id);
    }
}
