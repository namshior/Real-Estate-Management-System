import React from 'react';
import '../../style/propertyCard.css';
import { capitalizeWords } from '../../utils';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    const navigate = useNavigate();

    const handleClick = (propertyId) => {
        navigate(`/property/${propertyId}`);
    };

    return (
        <div>
            <div className='property-list'>
                <div
                    key={property.propertyId}
                    className='property-card-container'
                    onClick={() => handleClick(property.propertyId)}
                >
                    <div className='property-card'>
                        <h3 className='property-title'>{capitalizeWords(property.propertyName)}</h3>
                        <img src={`data:image/jpeg;base64,${property.propertyImage}`} alt='image' className='property-image' />
                        <p className='property-type'><strong>Type:</strong> {capitalizeWords(property.propertyType)}</p>
                        <p className='property-location'><strong>Location:</strong> {capitalizeWords(property.address)}</p>
                        <p className='property-size'><strong>Size:</strong> {capitalizeWords(property.size)} sq ft</p>
                        <p className='property-price'><strong>Price:</strong> INR {property.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;