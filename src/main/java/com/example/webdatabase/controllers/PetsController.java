package com.example.webdatabase.controllers;

import com.example.webdatabase.models.Pet;
import com.example.webdatabase.repositories.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/pets")
public class PetsController {

    @Autowired
    private PetRepository petRepository;

    @PostMapping(path = "/add", consumes = "application/json", produces = "application/json")
    public @ResponseBody
    Pet addNewPet(@RequestBody Pet pet){
        return petRepository.save(pet);
    }

    @GetMapping(path = "/all", produces = "application/json")
    public @ResponseBody Iterable<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @PutMapping(path = "/edit", consumes = "application/json", produces = "application/json")
    public @ResponseBody Pet editPet(@RequestBody Pet pet){
        return petRepository.save(pet);
    }

    @DeleteMapping(path = "delete", consumes = "application/json")
    public @ResponseBody Pet deletePet(@RequestBody Pet pet){
        petRepository.deleteById(pet.getId());
        return pet;
    }
}
