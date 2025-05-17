package com.example.rms.repository;

import com.example.rms.entity.Interaction;
import com.example.rms.entity.Property;
import com.example.rms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InteractionRepository extends JpaRepository<Interaction, Long> {

    List<Interaction> findByAgent(User agent);
    void deleteByProperty(Property property);
}
