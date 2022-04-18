package com.app.ToDoList.controllers;

import com.app.ToDoList.models.ListModel;
import com.app.ToDoList.services.ListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ListController {
    @Autowired
    private ListService service;

    @PostMapping("/addList")
    public ListModel addList(@RequestBody ListModel listModel) throws Exception {
        return service.save(listModel);
    }

    @GetMapping("/listById/{id}")
    public ListModel findById(@PathVariable Long id) throws Exception {
        return service.findById(id);
    }

    @GetMapping("/lists")
    public List<ListModel> findAll() throws Exception {
        return service.findAll();
    }

    @PutMapping("/updateList")
    public ListModel update(@RequestBody ListModel listModel) throws Exception {
        return service.update(listModel);
    }

    @DeleteMapping("/deleteList")
    public boolean delete(@RequestBody ListModel listModel) throws Exception {
        return service.delete(listModel);
    }

}
