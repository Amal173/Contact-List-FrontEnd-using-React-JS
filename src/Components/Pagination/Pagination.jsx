import React from 'react'
import './Pagination.css'
import { useDispatch, useSelector } from 'react-redux';
import { CurrentPage, getAllContacts, getCurrentPage } from '../../Redux/ContactSlice';
function Pagination() {
const dispatch=useDispatch();
const data=useSelector(getAllContacts)
const Currentpage = useSelector(CurrentPage);
console.log("getAllContacts",data);
function handleButtonClick(value){
    dispatch(getCurrentPage(value));
}
function handlePrevious(value){
    dispatch(getCurrentPage(value));
}
function handleNext(value){
    dispatch(getCurrentPage(value));
}

const totalPages=Math.ceil(data.length / 5);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    const renderKeys = () => {
         return pageNumbers.map((val) => {
             return <button className={"button"+(Currentpage === val ? 'active ' : '')} onClick={()=>handleButtonClick(val)} key={val}>{val}</button>
           })                 
       };

    return (
        <div className='paginationBody'>
            <div className="container">
                <div className='pagination'>
                    <ul className='paginationList'>
                        <button onClick={()=>handlePrevious(1)}><i className="fa-solid fa-angles-left"></i></button>                    
                        <div className="showCurrentPage">{renderKeys()}</div>     
                        <button onClick={()=>handleNext(totalPages)}><i className="fa-solid fa-angles-right"></i></button>
                    </ul >
                </div>
            </div>
        </div>
    )
}

export default Pagination