package com.example.webdatabase.repositories;

import org.springframework.data.repository.CrudRepository;
import com.example.webdatabase.models.Pet;

public interface PetRepository extends CrudRepository<Pet, Integer>{
}
