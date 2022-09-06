import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import { Login, Register, TableUser } from '../../pages'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<TableUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
