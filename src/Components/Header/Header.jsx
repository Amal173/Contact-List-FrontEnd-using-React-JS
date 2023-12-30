import React from 'react'

import './Header.css'
function Header() {

  return (
    <div className='header'>
      <div className="container">
        <header>
          <div className="brandName">
            <h1>Contact List</h1>
          </div>
          <div className="signinButton">
            <button>Sign Up</button>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Header