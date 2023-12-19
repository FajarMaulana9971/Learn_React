package com.fajarcodes.learn.Spring.with.React.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

import com.fajarcodes.learn.Spring.with.React.model.Region;
import com.fajarcodes.learn.Spring.with.React.repositories.RegionRepositories;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class RegionService {
    private RegionRepositories regionRepositories;

    public List<Region> getAll() {
        return regionRepositories.findAll();
    }

    // apabila hanya ini maka akan error
    // public Region getById(Integer id) {
    // return regionRepositories.findById(id);
    // }

    // solusinya harus menggunakan orElseThrow dikarenakan bersifat optional
    // sehingga apabila tidak ada maka dilemparkan sesuatu
    public Region getById(Integer id) {
        return regionRepositories.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "region with that id is not found"));
    }

    public Region create(Region region) {
        if (regionRepositories.findByName(region.getName()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "name is already used");
        }
        return regionRepositories.save(region);
    }

    public Region update(Integer id, Region region) {
        getById(id);
        region.setId(id);
        return regionRepositories.save(region);
    }

    public Region delete(Integer id) {
        Region region = getById(id);
        regionRepositories.delete(region);
        return region;
    }
}
