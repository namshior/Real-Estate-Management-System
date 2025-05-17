package com.example.rms.mapper;

import com.example.rms.dto.InteractionDto;
import com.example.rms.entity.Interaction;
import com.example.rms.entity.Property;
import com.example.rms.entity.User;

public class InteractionMapper {

    public static InteractionDto mapInteractionDto(Interaction interaction) {

        return new InteractionDto(
                interaction.getInteractionId(),
                interaction.getClient().getUserid(),
                interaction.getAgent().getUserid(),
                interaction.getProperty().getPropertyId(),
                interaction.getInteractionType(),
                interaction.getInteractionText(),
                interaction.getInteractionDate()
        );
    }

    public static Interaction mapInteraction(InteractionDto interactionDto) {

        return new Interaction(
                interactionDto.getInteractionId(),
                new User(interactionDto.getClientId()),
                new User(interactionDto.getAgentId()),
                new Property(interactionDto.getPropertyId()),
                interactionDto.getInteractionType(),
                interactionDto.getInteractionText(),
                interactionDto.getInteractionDate()
        );
    }
}
