package com.example.rms.service;

import com.example.rms.dto.InteractionDto;

import java.util.List;

public interface InteractionService {

    InteractionDto saveInteraction(InteractionDto interactionDto);
    List<InteractionDto> getInteractionByUserId(Long userId);
    void deleteInteraction(Long interactionId);
}
