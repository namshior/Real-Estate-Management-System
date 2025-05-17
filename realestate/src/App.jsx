// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/auth/login';
import ResetPassword from './pages/auth/ResetPassword';
import Signup from './pages/auth/Signup';
import AdminDashboard from './pages/admin/AdminDashboard';
import AgentDashboard from './pages/agent/agentdashboard';
import ClientDashboard from './pages/client/ClientDashboard';
import ClientsInfo from './pages/agent/ClientsInfo';
import AddPropertyForm from './pages/agent/addproperty';
import EditPropertyForm from './pages/agent/editproperty';
import SetPassword from './pages/auth/SetPassword';
import PropertyDetails from './pages/client/propertydetails';
import Home from './pages/home/homepage';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/forgot-password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/interested-clients" element={<ClientsInfo />} />
          <Route path="/add-property" element={<AddPropertyForm />} />
          <Route path="/edit-property/:propertyId" element={<EditPropertyForm />} />
          <Route path="/reset-password" element={<SetPassword />} />
          <Route path="/property/:propertyId" element={<PropertyDetails />} />
          <Route path="/" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
