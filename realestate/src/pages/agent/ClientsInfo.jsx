import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import '../../style/dashboard.css';

function ClientsInfo() {
  const [interestedClients, setInterestedClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [view, setView] = useState('interested');

  const name = localStorage.getItem('username');
  const [userId, setUserId] = useState(0);

  // Fetch agent ID based on username
  useEffect(() => {
    const fetchAgentId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/name/${name}`);
        setUserId(response.data.userid);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchAgentId();
  }, [name]);

  // Fetch interested clients based on agent ID
  useEffect(() => {
    const fetchInterestedClients = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/interactions/interested-clients/${userId}`);
          setInterestedClients(response.data);
        } catch (error) {
          console.error('Error fetching interested clients:', error);
        }
      }
    };

    fetchInterestedClients();
  }, [userId]);

  // Fetch client details for each interested client
  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const clientsData = await Promise.all(
          interestedClients.map(async (client) => {
            const response = await axios.get(`http://localhost:8080/api/users/id/${client.clientId}`);
            return {
              ...response.data,
              propertyId: client.propertyId,
              interactionId: client.interactionId,
              interactionType: client.interactionType,
              interactionText: client.interactionText
            };
          })
        );
        setClients(clientsData);
      } catch (error) {
        console.error('Error fetching client details:', error);
      }
    };

    if (interestedClients.length > 0) {
      fetchClientDetails();
    }
  }, [interestedClients]);

  // Fetch transactions and combine with client details
  useEffect(() => {
    const fetchTransactions = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/transactions/get-by-agent-id/${userId}`);
          const transactionsData = await Promise.all(
            response.data.map(async (transaction) => {
              const clientResponse = await axios.get(`http://localhost:8080/api/users/id/${transaction.clientId}`);
              return {
                ...transaction,
                username: clientResponse.data.username,
                email: clientResponse.data.email,
                phone: clientResponse.data.phone
              };
            })
          );
          setTransactions(transactionsData);
        } catch (error) {
          console.error('Error fetching transactions:', error);
        }
      }
    };

    fetchTransactions();
  }, [userId]);



  // Function to handle status update
  const handleStatusUpdate = async (transactionId) => {
    try {
      await axios.put(`http://localhost:8080/api/transactions/complete/${transactionId}`, {
        // transactionStatus: 'COMPLETED'
      });
      // Refresh the transactions list after updating
      const response = await axios.get(`http://localhost:8080/api/transactions/get-by-agent-id/${userId}`);
      const updatedTransactionsData = await Promise.all(
        response.data.map(async (transaction) => {
          const clientResponse = await axios.get(`http://localhost:8080/api/users/id/${transaction.clientId}`);
          return {
            ...transaction,
            username: clientResponse.data.username,
            email: clientResponse.data.email,
            phone: clientResponse.data.phone
          };
        })
      );
      setTransactions(updatedTransactionsData);
      alert('Transaction status updated to completed.');
    } catch (error) {
      console.error('Error updating transaction status:', error);
      alert('Error updating transaction status. Please try again.');
    }
  };



  const handleInteractionUpdate = async (interactionId) => {
    try {
        await axios.delete(`http://localhost:8080/api/interactions/delete/${interactionId}`);
        
        const updatedInterestedClients = interestedClients.filter(client => client.interactionId !== interactionId);
        setInterestedClients(updatedInterestedClients);

        const updatedClients = clients.filter(client => client.interactionId !== interactionId);
        setClients(updatedClients);

        alert('Interaction completed and deleted successfully.');
    } catch (error) {
        console.error('Error updating interaction status:', error);
        alert('Error updating interaction status. Please try again.');
    }
};


  const handleViewChange = (view) => {
    setView(view);
  };

  // Define columns for the clients and buyers tables
  const interestedClientColumns = [
    {
      title: 'Interaction Id',
      dataIndex: 'interactionId',
      key: 'interactionId'
    },
    {
      title: 'Property Id',
      dataIndex: 'propertyId',
      key: 'propertyId'
    },
    {
      title: 'Client Name',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Client Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact No',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Interaction Type',
      dataIndex: 'interactionType',
      key: 'interactionType'
    },
    {
      title: 'Interaction Text',
      dataIndex: 'interactionText',
      key: 'interactionText'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button type='primary' className='mark-as-completed-button' onClick={() => handleInteractionUpdate(record.interactionId)}>Complete and Delete Interaction</Button>
      ),
    }
  ];

  const transactionColumns = [
    {
      title: 'Property Id',
      dataIndex: 'propertyId',
      key: 'propertyId'
    },
    {
      title: 'Client Name',
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
    {
      title: 'Transaction Amount',
      dataIndex: 'transactionAmount',
      key: 'transactionAmount',
    },
    {
      title: 'Transaction Date',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
    },
    {
      title: 'Transaction Status',
      dataIndex: 'transactionStatus',
      key: 'transactionStatus',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        record.transactionStatus === 'INITIATED' && (
          <Button type='primary' className='mark-as-completed-button' onClick={() => handleStatusUpdate(record.transactionId)}>Mark as Completed</Button>
        )
      ),
    }
  ];

  return (
    <div>
      <nav className="navbar">
        <h1>Clients Info</h1>
        <ul>
          <li>
            <button onClick={() => handleViewChange('interested')}>Interested Clients</button>
          </li>
          <li>
            <button onClick={() => handleViewChange('transactions')}>Transaction Details</button>
          </li>
        </ul>
      </nav>
      <div className="content">
        {view === 'interested' && (
          <div>
            <h2>List of Interested Clients</h2>
            <Table columns={interestedClientColumns} dataSource={clients} rowKey="propertyId" />
          </div>
        )}
        {view === 'transactions' && (
          <div>
            <h2>List of Transactions</h2>
            <Table columns={transactionColumns} dataSource={transactions} rowKey="transactionId" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientsInfo;
