import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/propertyDetails.css';

const PropertyDetails = () => {
  const { propertyId } = useParams(); 
  const [property, setProperty] = useState(null);
  const [showContactPrompt, setShowContactPrompt] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [agentId, setAgentId] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [showMessagePrompt, setShowMessagePrompt] = useState(false);

  const username = localStorage.getItem('username');
  
  // Fetch property details
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/properties/getAll');
        const property = response.data.find(p => p.propertyId === parseInt(propertyId));
        setProperty(property || null);
      } catch (error) {
        console.error('Error fetching property details:', error);
        setProperty(null);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  // Fetch agent ID based on username
  useEffect(() => {
    if (property && property.createdBy) {
      const fetchAgentId = async () => {
        const name = property.createdBy;
        try {
          const response = await axios.get(`http://localhost:8080/api/users/name/${name}`);
          setAgentId(response.data.userid);
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      };

      fetchAgentId();
    }
  }, [property]);

  // Fetch client ID based on username
  useEffect(() => {
    if (property && property.createdBy) {
      const fetchClientId = async () => {
        const name = username;
        try {
          const response = await axios.get(`http://localhost:8080/api/users/name/${name}`);
          setClientId(response.data.userid);
        } catch (error) {
          console.error('Error fetching user ID:', error);
        }
      };

      fetchClientId();
    }
  }, [property]);

  const handleBuyClick = async () => {
    const userConfirmed = window.confirm('Are you ready to buy this property?');
    if (userConfirmed) {
      try {
        const response = await axios.post('http://localhost:8080/api/transactions/add', {
          agentId: agentId,
          clientId: clientId,
          propertyId: property.propertyId,
          transactionAmount: property.depositPayment,
          transactionStatus: "INITIATED"
        });

        console.log(response);
        alert('Transaction initiated. The agent will contact you soon.');
      } catch (error) {
        console.error('Error initiating transaction:', error);
        alert(error.response.data);
      }
    }
  };

  const handleInterestedClick = () => {
    setShowMessagePrompt(true);
  };

  const handleMessageSubmit = async () => {
    if (message.trim()) {
      try {
        if (agentId) {
          await axios.post('http://localhost:8080/api/interactions/add', {
            clientId,
            agentId,
            propertyId: property.propertyId,
            interactionType: 'INTERESTED',
            interactionText: message,
          });
          alert('Your interest has been recorded. The agent will contact you soon.');
          setMessage('');
          setShowMessagePrompt(false);
        } else {
          alert('Unable to retrieve user ID. Please try again later.');
        }
      } catch (error) {
        console.error('Error recording interest:', error);
        alert('There was an error recording your interest. Please try again.');
      }
    } else {
      alert('Please provide a message.');
    }
  };

  const handleContactSubmit = () => {
    if (contactInfo.trim()) {
      alert('Thank you! Your contact information has been received.');
      setShowContactPrompt(false);
    } else {
      alert('Please provide your contact information.');
    }
  };

  const handleContactClose = () => {
    setShowContactPrompt(false);
  };

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="property-details-container">
      <h1>{property.name}</h1>

      <img src={`data:image/jpeg;base64,${property.propertyImage}`} alt='image' className='property-image' />
      <p><strong>Property ID:</strong> {property.propertyId}</p>
      <p><strong>Property Type:</strong> {property.propertyType}</p>
      <p><strong>Agent Name:</strong> {property.createdBy}</p>
      <p><strong>Address:</strong> {property.address}</p>
      <p><strong>Price:</strong> INR {property.price}</p>
      <p><strong>Description:</strong> {property.description}</p>
      <p><strong>Deposit Payment:</strong> INR {property.depositPayment}</p>
      <p><strong>Occupancy Status:</strong> {property.occupancyStatus}</p>
      <p><strong>Closing Date:</strong> {new Date(property.closingDate).toLocaleDateString()}</p>

      <div className="button-group">
        <button className="buy-button" onClick={handleBuyClick}>Buy</button>
        <button className="interested-button" onClick={handleInterestedClick}>Interested</button>
      </div>

      {showMessagePrompt && (
        <div className="message-prompt">
          <p>Please enter a message for the agent: (Your Contact info will be shared with the agent)</p>
          <textarea
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="message-input"
          />
          <button onClick={handleMessageSubmit} className="message-submit-button">Submit</button>
          <button onClick={() => setShowMessagePrompt(false)} className="message-close-button">Close</button>
        </div>
      )}

      {showContactPrompt && (
        <div className="contact-prompt">
          <p>Since you are not ready to share your contact with the agent, please provide your contact information below:</p>
          <input
            type="text"
            placeholder="Enter your contact information"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="contact-input"
          />
          <button onClick={handleContactSubmit} className="contact-submit-button">Submit</button>
          <button onClick={handleContactClose} className="contact-close-button">Close</button>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
