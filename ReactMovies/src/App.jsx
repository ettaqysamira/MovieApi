import { useState } from 'react'
import NavBar from './NavBar'
import FetchApiTMDB from './MovieFromApi'
import './App.css'

function App() {

  return (
    <>
     <NavBar/>
     <FetchApiTMDB/> 
    </>
  )
}

export default App
