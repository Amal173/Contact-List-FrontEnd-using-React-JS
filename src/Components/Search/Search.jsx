import React from 'react'
import './Search.css'
import AddContactsForm from '../AddContactForm/AddContactsForm'
import { useDispatch, useSelector } from 'react-redux'
import { addContactForm, fetchAsyncContacts, getCurrentPage, showAddEmployeeForm } from '../../Redux/ContactSlice';
import OverLay from '../OverLay/OverLay';
function Search() {
    const dispatch = useDispatch();
    const data = useSelector(addContactForm);
    console.log("datata", data);
    let renderForm = '';
    let renderOverlay='';
    if (data) {
        renderOverlay=<OverLay />
        renderForm = <AddContactsForm />
    }
   async function HandleSearch({query}){
       await dispatch(fetchAsyncContacts({ limit: 5, page: 1,search:query }))
        dispatch(getCurrentPage(1))
    }
    function handleClick() {
        dispatch(showAddEmployeeForm(true));
    }
    return (
        <>
            <div className='search'>
                <div className="container">
                    <div className="row">
                        <div className="searchInput">
                            <input type="search" placeholder='search'  onChange={event => HandleSearch({ query: event.target.value.trim() })} />
                            <div className='searchIcon'>
                            <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <div className="addContactsBTN">
                            <button onClick={handleClick}>Add Contacts</button>
                        </div>
                    </div>
                </div>
            </div>
            {renderForm}
            {renderOverlay}
        </>
    )
}

export default Search