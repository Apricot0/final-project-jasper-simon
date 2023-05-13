
// import { useState, useEffect } from 'react';

import { useState } from 'react'
import Model from '../models/model'
import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default function Header ({ changeToPage }) {
  const [searchValue, setSearchValue] = useState('')
  const isLoggedIn = document.cookie.includes('isLoggedIn=true');
  const [errorMessage, setErrorMessage] = useState('')

  function handleSearchChange (event) {
    setSearchValue(event.target.value)
  }

  async function searchResult (event) {
    if (event.key === 'Enter') {
      const searchQuery = searchValue.trim()
      // change to something else;
      const qList = await Model.searchQuestions(searchQuery)
      console.log(qList)
      setSearchValue('')
      // changeToPage("questionPage")
      changeToPage('resultPage', {}, qList)
    }
  }

  function handleLogout() {
    // Clear the login cookie and redirect to the login page
    setErrorMessage('');
    document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    axios.post('http://localhost:8000/logout')
      .then(res => {
        if (res.status === 200) {
          window.location.href = '/';
        } else setErrorMessage('Logout failed due to server error. Please try again.');
      });
    // Redirect to the login page or home page
  }

  return (
    <div id="title-container" className="title-container">
      <div className="title">Fake Stack Overflow</div>
      <input type="search" name="search" id="search" placeholder="Search . . ." value={searchValue} onChange={handleSearchChange} onKeyDown={searchResult} />
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
    
  )
}

Header.propTypes = {
  changeToPage: PropTypes.func.isRequired
}