package com.example.rms.service.impl;

import com.example.rms.dto.InteractionDto;
import com.example.rms.entity.Interaction;
import com.example.rms.entity.Property;
import com.example.rms.entity.User;
import com.example.rms.mapper.InteractionMapper;
import com.example.rms.repository.InteractionRepository;
import com.example.rms.repository.PropertyRepository;
import com.example.rms.repository.UserRepository;
import com.example.rms.service.InteractionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InteractionServiceImpl implements InteractionService {

    private final InteractionRepository interactionRepository;
    private final UserRepository userRepository;
    private final PropertyRepository propertyRepository;

    @Autowired
    public InteractionServiceImpl(InteractionRepository interactionRepository, UserRepository userRepository, PropertyRepository propertyRepository) {
        this.interactionRepository = interactionRepository;
        this.userRepository = userRepository;
        this.propertyRepository = propertyRepository;
    }

    @Override
    @Transactional
    public InteractionDto saveInteraction(InteractionDto interactionDto) {

        User client = userRepository.findById(interactionDto.getClientId())
                .orElseThrow(() -> new RuntimeException("Client not found"));
        User agent = userRepository.findById(interactionDto.getAgentId())
                .orElseThrow(() -> new RuntimeException("Agent not found"));
        Property property = propertyRepository.findById(interactionDto.getPropertyId())
                .orElseThrow(() -> new RuntimeException("Property not found"));

        Interaction interaction = InteractionMapper.mapInteraction(interactionDto);
        interaction.setClient(client);
        interaction.setAgent(agent);
        interaction.setProperty(property);

        Interaction savedInteraction = interactionRepository.save(interaction);
        return InteractionMapper.mapInteractionDto(savedInteraction);
    }

    @Override
    public List<InteractionDto> getInteractionByUserId(Long userId) {
        User agent = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        List<Interaction> interactions = interactionRepository.findByAgent(agent);

        return interactions.stream()
                .map(InteractionMapper::mapInteractionDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteInteraction(Long interactionId) {
        interactionRepository.deleteById(interactionId);
    }

}
