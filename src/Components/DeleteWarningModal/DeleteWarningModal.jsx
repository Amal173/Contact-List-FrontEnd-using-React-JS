import React from 'react'
import './DeleteWarningModal.css'
import { useDispatch } from 'react-redux'
import { deleteAsyncContacts, fetchAsyncContacts, showDeleteWarnigModal } from '../../Redux/ContactSlice';
function DeleteWarningModal(id) {
    const dispatch = useDispatch();
    async function HandleDeleteContact() {
        console.log("ididid", id);
        await dispatch(deleteAsyncContacts(id))
       await  dispatch(fetchAsyncContacts({ limit: 5, page: 1, search: "" }));
       CancelDeleteContact();
    }
    function CancelDeleteContact() {
        dispatch(showDeleteWarnigModal(false))
    }

    return (
        <div className='deleteWarningModal'>
            <div className="modalFirstRow">
                <div className="CloseCrossButn" onClick={CancelDeleteContact}>
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="warningContent">
                <span>Are You Sure You Want To Delete This Contact ?</span>
            </div>
            <div className="modalButtons">
                <button className="CancelModal" onClick={CancelDeleteContact} >Cancel</button>
                <button className="DeleteModal" onClick={HandleDeleteContact} >Delete</button>
            </div>
        </div>
    )
}

export default DeleteWarningModal