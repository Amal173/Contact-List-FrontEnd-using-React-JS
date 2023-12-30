import React, { useEffect, useState } from 'react'
import './Table.css'
import { useDispatch, useSelector } from 'react-redux';
import {  CurrentPage, deleteWarningModal, fetchAsyncAllContacts, fetchAsyncContacts, getContacts, showDeleteWarnigModal, showEditContactForm, updateContactForm } from '../../Redux/ContactSlice';
import UpdateContactForm from '../UpdateContactForm/UpdateContactForm';
import OverLay from '../OverLay/OverLay';
import DeleteWarningModal from '../DeleteWarningModal/DeleteWarningModal';
function Table() {
    const dispatch = useDispatch();
    const data = useSelector(getContacts);
    const deleteModal = useSelector(deleteWarningModal);
    const Currentpage = useSelector(CurrentPage);
    const EditContactForm = useSelector(updateContactForm);
    const [id, setId] = useState();
    let showUpdateForm = '';
    let showOverlay = '';
    if (EditContactForm) {
        showUpdateForm = <UpdateContactForm id={id} />
        showOverlay = <OverLay />
    }

    let showDeleteWarningModal = '';
    if (deleteModal) {
        showDeleteWarningModal = <DeleteWarningModal id={id} />
        showOverlay = <OverLay />
    }
    console.log(data);
    useEffect(() => {
        dispatch(fetchAsyncContacts({ limit: 5, page:Currentpage , search: "" }));
        dispatch(fetchAsyncAllContacts())
    }, [dispatch,Currentpage])

    function HandleUpdate(id) {
        setId(id);
        dispatch(showEditContactForm(true))
    }

    async function HandleDelete(id) {
        setId(id);
        await dispatch(showDeleteWarnigModal(true))

    }

    let tableData = '';
    let i = 1;
    if (data.length > 0) {
        console.log("haii");
        tableData = data.map((data) => (
            <tr key={data.id}>
                <td>#0{i++}.</td>
                <td><div className="image"><img src={`http://localhost:8080/${data.imagepath}`} alt="" /></div>{data.firstName + " " + data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.phonenumber}</td>
                <td>
                    <button onClick={() => HandleUpdate(data.id)}>update</button>
                    <button onClick={() => HandleDelete(data.id)}>Delete</button>
                </td>
            </tr>
        ));
    }

    return (
        <>
            <div className='table'>
                <div className="container">
                    <div className="tableBody">
                        <table>
                            <thead>
                                <tr className='tableHead'>
                                    <th>Sl.No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showUpdateForm}
            {showOverlay}
            {showDeleteWarningModal}
        </>
    )
}

export default Table