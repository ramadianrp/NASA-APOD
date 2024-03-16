import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import NasaPhoto from './components/NasaPhoto'
import './App.css'
import IssSat from './components/IssSat'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={NasaPhoto} path='/nasaphoto' />
        <Route Component={IssSat} path='/issSat' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
