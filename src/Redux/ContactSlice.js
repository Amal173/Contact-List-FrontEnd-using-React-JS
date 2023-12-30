import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    contacts: {},
    getAllContacts:{},
    getOneContact:{},
    currentPage:1,
    showAddEmployeeForm:false,
    showEditContactForm:false,
    showDeleteWarnigModal:false,

};

export const fetchAsyncContacts = createAsyncThunk('contacts/fetchAsyncContacts', async (data) => {
    const {limit,page,search}=data;
    const response = await axios.get(`http://localhost:8080/contacts?limit=${limit}&page=${page}&search=${search}`)
    console.log("response data get contacts", response);
    return response.data
})
export const fetchAsyncAllContacts = createAsyncThunk('contacts/fetchAsyncAllContacts', async () => {
    const response = await axios.get(`http://localhost:8080/contacts/all`)
    console.log("response data get all contacts", response);
    return response.data
})
export const fetchAsyncContactsByID = createAsyncThunk('contacts/fetchAsyncContactsByID', async ({id}) => {
    const response = await axios.get(`http://localhost:8080/contacts/${id}`)
    console.log("response data fetch by id", response);
    return response.data
})


export const deleteAsyncContacts = createAsyncThunk('contacts/deleteAsyncContacts', async ({id}) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:8080/contacts/${id}`)
    console.log("response data od delete", response);
    return response.data
})


export const createAsyncContacts = createAsyncThunk('contacts/createAsyncContacts', async (data) => {
    console.log("crearte",data);
    const response = await axios.post(`http://localhost:8080/contacts`,data)
    console.log("response data of create", response);
    return response.data
})


export const updateAsyncContacts = createAsyncThunk('contacts/updateAsyncContacts', async (id,data) => {
    console.log("id and data",data);
    const response = await axios.put(`http://localhost:8080/contacts/${id}`,data)
    console.log("response data of update", response);
    return response.data
})


const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        showAddEmployeeForm: (state,{payload}) => {
            state.showAddEmployeeForm = payload
        },
        showEditContactForm: (state,{payload}) => {
            state.showEditContactForm = payload
        },
        showDeleteWarnigModal: (state,{payload}) => {
            state.showDeleteWarnigModal = payload
        },
        removeGetOneContact: (state) => {
            state.getOneContact = {}
        
        },
        getCurrentPage: (state,{payload}) => {
            state.currentPage = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncContacts.fulfilled, (state, { payload }) => {
            state.contacts = payload
        })
        builder.addCase(fetchAsyncAllContacts.fulfilled, (state, { payload }) => {
            state.getAllContacts = payload
        })
        builder.addCase(fetchAsyncContactsByID.fulfilled, (state, { payload }) => {
            state.getOneContact = payload
        })
    }
});


export const { showAddEmployeeForm ,showEditContactForm,showDeleteWarnigModal,removeGetOneContact,getCurrentPage} = contactSlice.actions;
export const getContacts = (state) => state.contacts.contacts;
export const getAllContacts = (state) => state.contacts.getAllContacts;
export const CurrentPage = (state) => state.contacts.currentPage;
export const addContactForm = (state) => state.contacts.showAddEmployeeForm;
export const updateContactForm = (state) => state.contacts.showEditContactForm;
export const deleteWarningModal = (state) => state.contacts.showDeleteWarnigModal;
export const getOneContact = (state) => state.contacts.getOneContact;
export default contactSlice.reducer;
