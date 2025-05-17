package com.example.rms.service;

import com.example.rms.dto.PropertyDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


public interface PropertyService {

    PropertyDto addProperty(PropertyDto propertyDto, MultipartFile propertyImage, String username) throws Exception;
    List<PropertyDto> getPropertiesByAgent(String username);
    PropertyDto updateProperty(Long propertyId, PropertyDto propertyDto, MultipartFile propertyImage) throws IOException;
    PropertyDto getProperty(Long propertyId);
    List<PropertyDto> getAllProperties();
    List<PropertyDto> getAllVacantProperties();
    void deleteProperty(Long propertyId);
}