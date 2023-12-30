import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Search from './Components/Search/Search';
import Table from './Components/Table/Table';
import Pagination from './Components/Pagination/Pagination';
function App() {

  return (
    <div className="App">
      <Header />
      <Search />
      <Table />
      <Pagination />
      <Footer />
    </div>
  );
}

export default App;
