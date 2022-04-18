package com.app.ToDoList.repositories;

import com.app.ToDoList.models.ListModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ListRepository extends JpaRepository<ListModel,Long> {

}
