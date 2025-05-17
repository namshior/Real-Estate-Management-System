package com.example.rms.controller;

import com.example.rms.dto.InteractionDto;
import com.example.rms.entity.Interaction;
import com.example.rms.service.InteractionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/interactions")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from this origin
public class InteractionController {

    private final InteractionService interactionService;

    public InteractionController(InteractionService interactionService) {
        this.interactionService = interactionService;
    }

    @PostMapping("/add")
    public ResponseEntity<InteractionDto> saveInteraction(@RequestBody InteractionDto interactionDto) {

        InteractionDto savedInteraction = interactionService.saveInteraction(interactionDto);
        return ResponseEntity.ok(savedInteraction);
    }


    @GetMapping("/interested-clients/{userId}")
    public ResponseEntity<List<InteractionDto>> getInterestedClients(@PathVariable Long userId) {
        List<InteractionDto> interactions = interactionService.getInteractionByUserId(userId);

        return ResponseEntity.ok(interactions);
    }

    @DeleteMapping("/delete/{interactionId}")
    public ResponseEntity<InteractionDto> deleteInteraction(@PathVariable Long interactionId) {

        interactionService.deleteInteraction(interactionId);
        return ResponseEntity.ok(null);
    }
}
