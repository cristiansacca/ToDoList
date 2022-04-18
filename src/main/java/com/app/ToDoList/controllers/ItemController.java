package com.app.ToDoList.controllers;

import com.app.ToDoList.models.ItemModel;
import com.app.ToDoList.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ItemController {
    @Autowired
    private ItemService service;

    @PostMapping("/addItem")
    public ItemModel addItem(@RequestBody ItemModel itemModel) throws Exception {
        return service.save(itemModel);
    }

    @GetMapping("/itemByList/{id}")
    public List<ItemModel> findByList(@PathVariable Long id) throws Exception {
        return service.findByList(id);
    }

    @GetMapping("/itemById/{id}")
    public ItemModel findById(@PathVariable Long id) throws Exception {
        return service.findById(id);
    }

    @GetMapping("/items")
    public List<ItemModel> findAll() throws Exception {
        return service.findAll();
    }

    @PutMapping("/updateItem")
    public ItemModel update(@RequestBody ItemModel itemModel) throws Exception {
        return service.update(itemModel);
    }

    @DeleteMapping("/deleteItem")
    public boolean delete(@RequestBody ItemModel itemModel) throws Exception {
        return service.delete(itemModel);
    }
}
