package com.example.webdatabase.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {

    @GetMapping(path = "/pets")
    public String getPetsPage(Model model){
        model.addAttribute("name", "BRUNO");
        return "pets";
    }

}
