import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import NasaPhoto from './components/NasaPhoto'
import './App.css'
import IssSat from './components/IssSat'
import IssPosition from './components/IssPosition'
import SpaceMan from './components/SpaceMan'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route Component={Home} path="/" />
        <Route Component={NasaPhoto} path='/nasaphoto' />
        <Route Component={IssPosition} path='/issPos' />
        <Route Component={SpaceMan} path='/astro' />
      </Routes>
    </BrowserRouter>
  )
}

export default App
