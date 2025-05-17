// src/components/ClientDashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import '../../style/clientDashboard.css';
import { Button, Input, Select, InputNumber } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;
const { Option } = Select;

function ClientDashboard() {
  const username = localStorage.getItem('username');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const navigate = useNavigate();

  const headerStyle = {
    backgroundColor: '#f0f2f5',
    padding: '20px',
    textAlign: 'center',
    color: '#001529',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/properties/getAllVacant');
      setProperties(response.data);
      setFilteredProperties(response.data);
    } catch (error) {
      console.error('There was an error fetching the properties!', error);
      setProperties([]);
      setFilteredProperties([]);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterProperties(value, propertyType, minPrice, maxPrice);
  };

  const handleTypeChange = (value) => {
    setPropertyType(value);
    filterProperties(searchTerm, value, minPrice, maxPrice);
  };

  const handlePriceRangeChange = () => {
    filterProperties(searchTerm, propertyType, minPrice, maxPrice);
  };

  const filterProperties = (term, type, min, max) => {
    const filtered = properties.filter(property =>
      (property.address.toLowerCase().includes(term.toLowerCase()) || term === '') &&
      (property.propertyType === type || type === '') &&
      (property.price >= (min || 0)) &&
      (property.price <= (max || Infinity))
    );
    setFilteredProperties(filtered);
  };

  const handleLogout = () => {
    navigate(`/login`);
  };

  return (
    <div className="client-main-container">

      <div className="client-navbar">
        <header className="welcome-message">Welcome {username}</header>
        <Button
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </Button>
      </div>



      <div className="filter-container">
        <Search
          placeholder="Search by location"
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Select property type"
          onChange={handleTypeChange}
        >
          <Option value="">All Types</Option>
          <Option value="sale">Sale</Option>
          <Option value="rent">Rent</Option>
        </Select>
        <div className="price-filter">
          <InputNumber
            placeholder="Min Price"
            onChange={value => setMinPrice(value)}
            min={0}
          />
          <InputNumber
            placeholder="Max Price"
            onChange={value => setMaxPrice(value)}
            min={0}
          />
          <Button
            type="primary"
            onClick={handlePriceRangeChange}
          >
            Apply Price Range
          </Button>
        </div>
      </div>


      <div className="client-dashboard">
        {filteredProperties.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </div>
  );
}

export default ClientDashboard;
