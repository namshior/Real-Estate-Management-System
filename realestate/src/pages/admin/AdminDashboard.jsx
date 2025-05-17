import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import '../../style/admindashboardstyles.css';

const AdminDashboard = () => {
  const [view, setView] = useState('agents'); 
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersByRole('AGENT');
  }, []);

  const handleLogout = () => {
    navigate(`/login`);
  };

  const handleViewChange = (viewName) => {
    setView(viewName);
    if (viewName === 'agents' || viewName === 'clients') {
      const role = viewName === 'agents' ? 'AGENT' : 'CLIENT';
      fetchUsersByRole(role);
    } else if (viewName === 'properties') {
      fetchProperties();
    }
  };

  const fetchUsersByRole = async (role) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${role}`);
      setUsers(response.data);
    } catch (error) {
      console.error(`There was an error fetching the ${role.toLowerCase()}s!`, error);
      setUsers([]);
      message.error(`Failed to load ${role.toLowerCase()}s.`);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/properties/getAll');
      setProperties(response.data);
    } catch (error) {
      console.error('There was an error fetching the properties!', error);
      setProperties([]);
      message.error('Failed to load properties.');
    }
  };

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact No',
      dataIndex: 'phone',
      key: 'phone',
    },
  ];

  const propertyColumns = [
    {
      title: 'Image',
      dataIndex: 'propertyImage',
      key: 'propertyImage',
      render: (propertyImage) => (
        propertyImage && propertyImage.length > 0 ? (
          <img src={`data:image/jpeg;base64,${propertyImage}`} alt="Property" style={{ width: '100px' }} />
        ) : (
          'No Image'
        )
      ),
    },
    {
      title: 'Agent Name',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Property Type',
      dataIndex: 'propertyType',
      key: 'propertyType',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `INR ${text}`,
    },
    {
      title: 'Occupancy Status',
      dataIndex: 'occupancyStatus',
      key: 'occupancyStatus',
    },
    {
      title: 'Deposit Payment',
      dataIndex: 'depositPayment',
      key: 'depositPayment',
      render: (text) => `INR ${text}`,
    },
  ];

  return (
    <div className="admin-dashboard">
      <nav className="menu-bar">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <Button
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className='logout-button'
        >
          Logout
        </Button>
        <ul>
          <li><Button type="link" onClick={() => handleViewChange('agents')}>View Agents</Button></li>
          <li><Button type="link" onClick={() => handleViewChange('clients')}>View Clients</Button></li>
          <li><Button type="link" onClick={() => handleViewChange('properties')}>View Properties</Button></li>
        </ul>
      </nav>
      <div className="content">
        {view === 'agents' && (
          <div>
            <h2>List of Agents</h2>
            {Array.isArray(users) && users.length > 0 ? (
              <Table columns={userColumns} dataSource={users} rowKey="userid" />
            ) : (
              <p>No agents found</p>
            )}
          </div>
        )}

        {view === 'clients' && (
          <div>
            <h2>List of Clients</h2>
            {Array.isArray(users) && users.length > 0 ? (
              <Table columns={userColumns} dataSource={users} rowKey="userid" />
            ) : (
              <p>No clients found</p>
            )}
          </div>
        )}

        {view === 'properties' && (
          <div>
            <h2>List of Properties</h2>
            {Array.isArray(properties) && properties.length > 0 ? (
              <Table columns={propertyColumns} dataSource={properties} rowKey="propertyId" />
            ) : (
              <p>No properties found</p>
            )}
          </div>
        )}

        {!view && <h2>Select an option from the menu</h2>}
      </div>
    </div>
  );
};

export default AdminDashboard;
