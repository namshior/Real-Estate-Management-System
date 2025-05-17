package com.example.rms.service.impl;


import com.example.rms.dto.PropertyDto;
import com.example.rms.entity.Property;
import com.example.rms.mapper.PropertyMapper;
import com.example.rms.repository.PropertyRepository;
import com.example.rms.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }


    @Override
    public PropertyDto addProperty(PropertyDto propertyDto, MultipartFile propertyImage, String username) throws IOException {

        Property property = PropertyMapper.maptoProperty(propertyDto);

        if(propertyImage != null && !propertyImage.isEmpty()) {
            property.setPropertyImage(propertyImage.getBytes());
        }

        property.setCreatedBy(username);

        Property savedProperty = propertyRepository.save(property);

        return PropertyMapper.maptoPropertyDto(savedProperty);
    }

    @Override
    public List<PropertyDto> getPropertiesByAgent(String username) {
        List<Property> properties = propertyRepository.findByCreatedBy(username);


        if (properties.isEmpty()) {
            return List.of();
        }

        return properties.stream()
                .map(PropertyMapper::maptoPropertyDto)
                .collect(Collectors.toList());
    }

    @Override
    public PropertyDto updateProperty(Long id, PropertyDto propertyDto, MultipartFile propertyImage) throws IOException {

        Property existingProperty = propertyRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Property not found")
        );

        existingProperty.setPropertyName(propertyDto.getPropertyName());
        existingProperty.setPropertyType(propertyDto.getPropertyType());
        existingProperty.setAddress(propertyDto.getAddress());
        existingProperty.setSize(propertyDto.getSize());
        existingProperty.setPrice(propertyDto.getPrice());
        existingProperty.setOccupancyStatus(propertyDto.getOccupancyStatus());
        existingProperty.setClosingDate(propertyDto.getClosingDate());
        existingProperty.setDepositPayment(propertyDto.getDepositPayment());
        existingProperty.setDescription(propertyDto.getDescription());

        if(propertyImage != null && !propertyImage.isEmpty()) {
            existingProperty.setPropertyImage(propertyImage.getBytes());
        }

        Property updatedProperty = propertyRepository.save(existingProperty);

        return PropertyMapper.maptoPropertyDto(updatedProperty);
    }

    @Override
    public PropertyDto getProperty(Long propertyId) {

        Property property = propertyRepository.findById(propertyId).orElseThrow(
                () -> new RuntimeException("Property not found")
        );

        return PropertyMapper.maptoPropertyDto(property);
    }

    @Override
    public List<PropertyDto> getAllProperties() {

        List<Property> properties = propertyRepository.findAll();

        return properties.stream().map(PropertyMapper::maptoPropertyDto).collect(Collectors.toList());
    }

    @Override
    public List<PropertyDto> getAllVacantProperties() {
        List<Property> vacantProperties = propertyRepository.findBySoldFalse();

        return vacantProperties.stream()
                .map(PropertyMapper::maptoPropertyDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteProperty(Long propertyId) {
        Property property = propertyRepository.findById(propertyId).orElseThrow(
                () -> new RuntimeException("Property not found")
        );

        propertyRepository.delete(property);
    }


}