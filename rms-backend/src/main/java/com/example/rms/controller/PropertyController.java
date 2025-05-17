package com.example.rms.controller;


import com.example.rms.dto.PropertyDto;
import com.example.rms.service.PropertyService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    //    Add Property REST API
    @PostMapping("/add")
    public ResponseEntity<PropertyDto> addProperty(@RequestPart("property") String propertyJson, @RequestPart("propertyImage") MultipartFile propertyImage, @RequestPart("username") String username) {

        try {
            // Convert JSON string to PropertyDto
            PropertyDto propertyDto = new ObjectMapper().readValue(propertyJson, PropertyDto.class);
            PropertyDto savedProperty = propertyService.addProperty(propertyDto, propertyImage, username);
            return ResponseEntity.ok(savedProperty);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    //    get property by id
    @GetMapping("/{propertyId}")
    public ResponseEntity<PropertyDto> getProperty(@PathVariable("propertyId") Long propertyId) {
        PropertyDto propertyDto = propertyService.getProperty(propertyId);
        return ResponseEntity.ok(propertyDto);
    }

    //    get properties by agent
    @GetMapping("/agent-properties/{username}")
    public ResponseEntity<List<PropertyDto>> getPropertiesForAgent(@PathVariable("username") String username) {
        List<PropertyDto> properties = propertyService.getPropertiesByAgent(username);

        return ResponseEntity.ok(properties);
    }

    //    update properties by agent
    @PutMapping("/edit/{propertyId}")
    public ResponseEntity<PropertyDto> updateProperty(@PathVariable Long propertyId, @RequestPart("property") String propertyJson, @RequestPart("propertyImage") MultipartFile propertyImage) {

        try {
            PropertyDto propertyDto = new ObjectMapper().readValue(propertyJson, PropertyDto.class);

            PropertyDto updatedProperty = propertyService.updateProperty(propertyId, propertyDto, propertyImage);

            return ResponseEntity.ok(updatedProperty);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    //    delete properties by agent
    @DeleteMapping("/delete/{propertyId}")
    public ResponseEntity<PropertyDto> deleteProperty(@PathVariable Long propertyId) {
        propertyService.deleteProperty(propertyId);
        return ResponseEntity.ok(null);
    }

    //    get all properties
    @GetMapping("/getAll")
    public ResponseEntity<List<PropertyDto>> getAllProperties() {
        List<PropertyDto> properties = propertyService.getAllProperties();
        return ResponseEntity.ok(properties);
    }

    //    get all vacant properties
    @GetMapping("/getAllVacant")
    public ResponseEntity<List<PropertyDto>> getAllVacantProperties() {
        List<PropertyDto> properties = propertyService.getAllVacantProperties();
        return ResponseEntity.ok(properties);
    }
}