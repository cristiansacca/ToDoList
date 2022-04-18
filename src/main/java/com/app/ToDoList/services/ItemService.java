package com.app.ToDoList.services;
import com.app.ToDoList.models.ItemModel;
import com.app.ToDoList.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ItemService {
    @Autowired
    private ItemRepository repository;

    @Transactional
    public List<ItemModel> findAll() throws Exception{
        try {
            List <ItemModel> items = repository.findAll();
            return items;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Transactional
    public List<ItemModel> findByList(Long id) throws Exception{
        try {
            List<ItemModel> items = repository.findByList(id);
            return items;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Transactional
    public ItemModel findById(Long id) throws Exception{
        try {
            Optional<ItemModel> itemOptional = repository.findById(id);
            return itemOptional.get();
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Transactional
    public ItemModel save(ItemModel x) throws Exception{
        try {
            ItemModel item = repository.save(x);
            return item;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Transactional
    public ItemModel update(ItemModel x) throws Exception{
        try {
            Optional<ItemModel> itemOptional = repository.findById(x.getId());
            ItemModel item = itemOptional.get();
            item.setDescription(x.getDescription());
            item.setDone(x.getDone());
            item.setList(x.getList());
            return repository.save(item);

        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Transactional
    public boolean delete(ItemModel toDoItem) throws Exception{
        try{
            repository.delete(toDoItem);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
