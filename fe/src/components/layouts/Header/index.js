import React, { useEffect, useState } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Gap } from '../../molecules'
import { useNavigate } from 'react-router-dom'

const HeaderComponent = () => {
  const navigate = useNavigate()
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [token, setToken] = useState('')
  const [exp, setExp] = useState('')

  const axiosJWT = axios.create()
  axiosJWT.interceptors.request.use(
    async (config) => {
      const now = new Date().getTime()
      if (exp * 1000 < now) {
        const { data } = await axios.get(
          'http://127.0.0.1:8000/api/auth/refresh-token'
        )
        const accessToken = data.accessToken
        config.headers.authorization = `Bearer ${accessToken}`
        setToken(accessToken)
        const decoded = jwtDecode(accessToken)
        setExp(decoded.exp)
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  const me = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
      const { data } = await axiosJWT.get(
        'http://127.0.0.1:8000/api/auth/me',
        config
      )

      const userInfo = data.user
      const payload = {
        isLogin: true,
        userInfo,
      }
      dispatch({ type: 'LOGIN', payload })
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await axios.delete('http://127.0.0.1:8000/api/auth/logout')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    me()
  }, [])

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Home</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/register">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
            <Button className="btn-dark" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default HeaderComponent
