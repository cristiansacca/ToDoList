package com.app.ToDoList.services;
import com.app.ToDoList.models.ListModel;
import com.app.ToDoList.repositories.ListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ListService {
    @Autowired
    private ListRepository repository;

    @Transactional
    public List<ListModel> findAll() throws Exception{
        try {
            java.util.List<ListModel> lists = repository.findAll();
            return lists;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Transactional
    public ListModel findById(Long id) throws Exception{
        try {
            Optional<ListModel> list = repository.findById(id);
            return list.get();
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Transactional
    public ListModel save(ListModel toDoList) throws Exception{
        try {
            ListModel list = repository.save(toDoList);
            return list;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Transactional
    public ListModel update(ListModel toDoList) throws Exception{
        try {
            Optional<ListModel> toDoListOptional = repository.findById(toDoList.getId());
            ListModel list = toDoListOptional.get();
            list.setDate(toDoList.getDate());
            list.setTitle(toDoList.getTitle());
            return repository.save(list);

        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    @Transactional
    public boolean delete(ListModel toDoList) throws Exception{
        try{
            repository.delete(toDoList);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
