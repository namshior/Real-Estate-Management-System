package com.example.rms.mapper;

import com.example.rms.dto.PropertyDto;
import com.example.rms.entity.Property;

public class PropertyMapper {

    public static PropertyDto maptoPropertyDto(Property property) {

        return new PropertyDto(
                property.getPropertyId(),
                property.getPropertyName(),
                property.getPropertyType(),
                property.getAddress(),
                property.getSize(),
                property.getPrice(),
                property.getOccupancyStatus(),
                property.getClosingDate(),
                property.getDepositPayment(),
                property.getDescription(),
                property.getPropertyImage(),
                property.getCreatedBy(),
                property.isSold()
        );
    }

    public static Property maptoProperty(PropertyDto propertyDto) {
        Property property = new Property(
                propertyDto.getPropertyId(),
                propertyDto.getPropertyName(),
                propertyDto.getPropertyType(),
                propertyDto.getAddress(),
                propertyDto.getSize(),
                propertyDto.getPrice(),
                propertyDto.getOccupancyStatus(),
                propertyDto.getClosingDate(),
                propertyDto.getDepositPayment(),
                propertyDto.getDescription(),
                propertyDto.getPropertyImage(),
                propertyDto.getCreatedBy(),
                propertyDto.isSold()
        );

        return property;
    }

}
