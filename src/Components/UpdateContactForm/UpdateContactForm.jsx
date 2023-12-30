import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncContactsByID, getOneContact, showEditContactForm, updateAsyncContacts } from '../../Redux/ContactSlice';
import './UpdateContactForm.css'

function UpdateContactForm(id) {
  const [data, setData] = useState({ imagepath: "", firstName: '', lastName: '', email: '', phonenumber: '' })
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  
  function handleCancelForm() {
    dispatch(showEditContactForm(false));
  }
  const getOneData = useSelector(getOneContact);
  useEffect(() => {
    dispatch(fetchAsyncContactsByID(id));

  
  }, [dispatch, id])

  useEffect(()=>{
     if ( getOneData && getOneData.length > 0) {
    const contactData = getOneData[0];
      setData({
        imagepath: contactData.imagepath || "",
        firstName: contactData.firstName || '',
        lastName: contactData.lastName || '',
        email: contactData.email || '',
        phonenumber: contactData.phonenumber || ''
      });
    }
  }, [getOneData]);

  console.log("getOneData", data);

  async function handleSubmitForm(id) {
    const { firstName, lastName, email, phonenumber } = data;
    const formData = new FormData();
    formData.append('imagepath', file);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phonenumber', phonenumber);
    console.log("form",formData);
    await dispatch(updateAsyncContacts({id,formData}));
    handleCancelForm();
  }


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    <div className='updateContactsForm'>
      <div className="title">
        <h1>Edit Contacts</h1>
        <i onClick={handleCancelForm} class="fa-solid fa-xmark"></i>
      </div>
      <div className="contactImage"  onClick={()=> fileInputRef.current.click()}>
        <img src={imagePreview||`http://localhost:8080/${data.imagepath}` ||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="" />
      </div>
      <input className='addImage'  ref={fileInputRef} style={{ display: 'none' }} type="file" accept='image/*' name='imagepath' onChange={handleImageChange} />
      <form action="">
        <div className="row">
          <label htmlFor="">Enter Name</label>
          <div className="input">
            <input type="text" placeholder='First Name'name='firstName' value={data.firstName} onChange={handleInputChange}/>
            <input type="text" placeholder='Last Name' name='lastName' value={data.lastName} onChange={handleInputChange} />
          </div>
        </div>
        <div className="row">
          <label htmlFor="">Email</label>
          <input type="text" placeholder='Enter Email' name='email' value={data.email}  onChange={handleInputChange}/>
        </div>
        <div className="row">
          <label htmlFor="">PhoneNumber</label>
          <input type="text" placeholder='Enter Phone Number'name='phonenumber' value={data.phonenumber}onChange={handleInputChange} />
        </div>
        <div className="buttons">
          <button onClick={handleCancelForm} className='cancelButton'>cancel</button>
          <button type='button' className='submitButton' onClick={()=>handleSubmitForm(id)}>submit</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateContactForm