import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Cars from './pages/Cars'
import CarDetails from './pages/CarDetails'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import ManageBookings from './pages/owner/ManageBookings'
import ManageCars from './pages/owner/ManageCars'
import AddCar from './pages/owner/AddCar'
import Dashboard from './pages/owner/Dashboard'
import Layout from './pages/owner/Layout'
import Login from './components/Login'
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import DetailsUserBooked from './pages/owner/DetailsUserBooked'

const App = () => {

  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>
    <Toaster/>
    { showLogin &&     <Login/>
}
      {!isOwnerPath && <Navbar/>}

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/car-details/:id' element={<CarDetails/>}/>
        <Route path='/vehicles' element={<Cars/>}/>
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='add-vehicle' element={<AddCar/>}/>
            <Route path='manage-vehicle' element={<ManageCars/>}/>
            <Route path='manage-bookings' element={<ManageBookings/>}/>
            <Route path='clientDetails' element={<DetailsUserBooked/>}/>

        </Route>
      </Routes>
      {!isOwnerPath && <Footer/>}
    </>
  )
}

export default App