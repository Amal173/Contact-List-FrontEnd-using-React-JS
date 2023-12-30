import React, { useRef, useState } from 'react';
import './AddContactsForm.css';
import { useDispatch } from 'react-redux';
import { createAsyncContacts, fetchAsyncContacts, showAddEmployeeForm } from '../../Redux/ContactSlice';

function AddContactsForm() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const [contactData, setContactData] = useState({
    imagepath: '',
    firstName: '',
    lastName: '',
    email: '',
    phonenumber: '',
  });

  const dispatch = useDispatch();

  async function handleCancelForm() {
    dispatch(showAddEmployeeForm(false));
    await dispatch(fetchAsyncContacts({ limit: 5, page: 1, search: '' }));
  }

  async function handleSubmitForm() {
    const { firstName, lastName, email, phonenumber } = contactData;
    const formData = new FormData();
    formData.append('imagepath', file);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phonenumber', phonenumber);
    console.log("form",formData);
    await dispatch(createAsyncContacts(formData));
    handleCancelForm();
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setImagePreview('');
    }
  };

  return (
    <div className='addContactsForm'>
      <div className="title">
        <h1>Add Contacts</h1>
        <i onClick={handleCancelForm} className="fa-solid fa-xmark"></i>
      </div>
      <div className="contactImage" htmlFor="addImage" onClick={handleImageClick}>
        <img src={imagePreview|| "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
      </div>
      <input className='addImage'  ref={fileInputRef} style={{ display: 'none' }} type="file" accept='image/*' name='imagepath' onChange={handleImageChange} />
      <form action="">
        <div className="row">
          <label htmlFor="">Enter Name</label>
          <div className="input">
            <input type="text" placeholder='First Name' name='firstName' value={contactData.firstName} onChange={handleInputChange} />
            <input type="text" placeholder='Last Name' name='lastName' value={contactData.lastName} onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <label htmlFor="">Email</label>
          <input type="text" placeholder='Enter Email' name='email' value={contactData.email} onChange={handleInputChange} />
        </div>
        <div className="row">
          <label htmlFor="">PhoneNumber</label>
          <input type="text" placeholder='Enter Phone Number' name='phonenumber' value={contactData.phonenumber} onChange={handleInputChange} />
        </div>
        <div className="buttons">
          <button onClick={handleCancelForm} className='cancelButton'>cancel</button>
          <button type='button' className='submitButton' onClick={handleSubmitForm}>submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddContactsForm