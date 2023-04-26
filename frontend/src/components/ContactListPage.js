import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getContacts, deleteContact } from '../utils/api';

function ContactListPage() {
  const [contacts, setContacts] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      history.push('/');
    } else {
      fetchContacts();
    }
  }, [token, history]);

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      console.log("The data is:")
      console.log(response.data.data)
      setContacts(response.data.data);
    } catch (error) {
      console.error('Fetching contacts failed:', error);
    }
  };

  const handleDelete = async (contactId) => {
    try {
      await deleteContact(contactId);
      fetchContacts();
    } catch (error) {
      console.error('Deleting contact failed:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div>
      <h1>Contact List</h1>
      
      <div>
      {Object.entries(contacts).map(([key, value]) => (
        <li key={key}>
          {value.first_name} {value.last_name} - {value.phone_number} - {value.email} - {value.address}
          <button onClick={() => history.push(`/edit/${value.id}`)}>Edit</button>
          <button onClick={() => handleDelete(value.id)}>Delete</button>
        </li>
      ))}
      </div>
      <button onClick={() => history.push('/add-contact')}>Add Contact</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ContactListPage;
