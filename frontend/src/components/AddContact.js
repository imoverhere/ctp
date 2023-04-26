import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addContact } from '../utils/api';

function AddContact() {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [phone_number, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const history = useHistory();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact(first_name, last_name, phone_number, email, address);
      history.push('/contacts');
    } catch (error) {
      console.error('Adding contact failed:', error);
    }
  };

  return (
    <div>
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone_number}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Adress"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default AddContact;
