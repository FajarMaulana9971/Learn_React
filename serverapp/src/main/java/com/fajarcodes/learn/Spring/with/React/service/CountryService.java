package com.fajarcodes.learn.Spring.with.React.service;

import java.util.List;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fajarcodes.learn.Spring.with.React.model.Country;
import com.fajarcodes.learn.Spring.with.React.model.Region;
import com.fajarcodes.learn.Spring.with.React.model.dto.request.CountryRequest;
import com.fajarcodes.learn.Spring.with.React.repositories.CountryRepositories;
import com.fajarcodes.learn.Spring.with.React.repositories.RegionRepositories;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CountryService {
    private CountryRepositories countryRepositories;
    private RegionRepositories regionRepositories;
    private RegionService regionService;

    public List<Country> getAll() {
        return countryRepositories.findAll();
    }

    public Country getById(Integer id) {
        return countryRepositories.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "country with that id is not found"));
    }

    public Country create(Country country) {
        if (countryRepositories.existsByName(country.getName())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Name Country is already exists!!!");
        }
        if (regionRepositories.findByName(country.getName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "name Region is already exist");
        }

        return countryRepositories.save(country);
    }

    public Country createWithDto(CountryRequest countryRequest) {
        Country country = new Country();
        country.setCode(countryRequest.getCode());
        country.setName(countryRequest.getName());
        Region region = regionService.getById(countryRequest.getRegionId());
        country.setRegion(region);
        if (countryRepositories.existsByName(country.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Name Country is already exist!!");
        }
        return countryRepositories.save(country);
    }

    public Country update(Integer id, Country country) {
        getById(id);
        country.setId(id);
        if (countryRepositories.existsByName(country.getName())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Country name is already exist");
        }
        return countryRepositories.save(country);
    }

    // public CountryRequest updateWithRequest(Integer id, CountryRequest
    // countryRequest) {
    // Country country = countryRepositories
    // .findById(id)
    // .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Country
    // Id is not found"));
    // Region region = regionRepositories
    // .findById(countryRequest.getRegionId())
    // .orElse(null);

    // country.setCode(countryRequest.getCode());
    // country.setName(countryRequest.getName());

    // if (region != null) {
    // country.setRegion(region);
    // } else {
    // Region defaultRegion = regionRepositories.findById(id)
    // .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Default
    // Region not found"));
    // country.setRegion(defaultRegion);
    // }

    // countryRepositories.save(country);

    // CountryRequest updatedCountryRequest = new CountryRequest();
    // updatedCountryRequest.setCode(country.getCode());
    // updatedCountryRequest.setName(country.getName());
    // updatedCountryRequest.setRegionId(country.getRegion().getId());

    // return updatedCountryRequest;
    // }

    public Country update(Integer countryId, CountryRequest request) {

        Country country = countryRepositories
                .findById(countryId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Country not found"));
        Region region = regionRepositories
                .findById(request.getRegionId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Region not found"));

        if (request.getName().equalsIgnoreCase(region.getName())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "The region name and the country name must not be the same");
        }

        country.setRegion(region);
        country.setCode(request.getCode());
        country.setName(request.getName());

        return countryRepositories.save(country);
    }

    public Country delete(Integer id) {
        Country country = getById(id);
        countryRepositories.delete(country);
        return country;
    }
}
