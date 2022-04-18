package com.app.ToDoList.repositories;

import com.app.ToDoList.models.ItemModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<ItemModel,Long> {
    @Query( value = "SELECT * FROM item WHERE item.list_id = :id",
            nativeQuery = true
    )
    List<ItemModel> findByList(@Param("id") Long id);
}
