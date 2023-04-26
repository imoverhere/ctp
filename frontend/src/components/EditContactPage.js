import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getContact, editContact } from '../utils/api';

function EditContactPage() {
  const [first_name, setFirstName] = useState(``);
  const [last_name, setLastName] = useState(``);
  const [phone, setPhone] = useState(``);
  const [email, setEmail] = useState(``);
  const [address, setAddress] = useState(``);
  const history = useHistory();
  const { id } = useParams();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      history.push('/');
    } else {
      fetchContact();
    }
  }, [token, history]);

  const fetchContact = async () => {
    try {
      const response = await getContact(id);
      setFirstName(response.data.data.first_name);
      setLastName(response.data.data.last_name);
      setPhone(response.data.data.phone_number);
      setEmail(response.data.data.email);
      setAddress(response.data.data.address);
    } catch (error) {
      console.error('Fetching contact failed:', error);
    }
  };

  const handleNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSave = async () => {
    try {
      await editContact(id, {
        name: first_name,
        last_name,
        phone,
        email,
        address,
      });
      history.push('/contacts');
    } catch (error) {
      console.error('Updating contact failed:', error);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <h1>Edit Contact</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={first_name} onChange={handleNameChange} />
        <br />
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="name" value={last_name} onChange={handleLastNameChange} />
        <br />
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value={phone} onChange={handlePhoneChange} />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
        <br />
        <label htmlFor="email">Address:</label>
        <input type="text" id="address" name="address" value={address} onChange={handleAddressChange} />
        <br />
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default EditContactPage;
