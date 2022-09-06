import React, { useState, useEffect } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { HeaderComponent } from '../../components'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { tanggalIndonesia } from '../../helpers'
import { getDataUsers } from '../../redux/action/homeAction'

const TableUser = () => {
  const navigate = useNavigate()
  const stateHome = useSelector((state) => state.homeReducer)
  const { listUsers } = stateHome

  const dispatch = useDispatch()

  const [token, setToken] = useState('')
  const [exp, setExp] = useState('')

  const refreshToken = async () => {
    try {
      const { data } = await axios.get(
        'http://127.0.0.1:8000/api/auth/refresh-token'
      )
      const accessToken = data.accessToken
      setToken(accessToken)
      const decoded = jwtDecode(accessToken)
      setExp(decoded.exp)
      const userInfo = {
        uuid: decoded.uuid,
        name: decoded.name,
        username: decoded.username,
        email: decoded.email,
      }
      const payload = {
        isLogin: true,
        userInfo,
      }
      dispatch({ type: 'LOGIN', payload })
    } catch (error) {
      if (error.response) navigate('/login')
    }
  }

  // const axiosJWT = axios.create()
  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     const now = new Date().getTime()
  //     if (exp * 1000 < now) {
  //       const { data } = await axios.get(
  //         'http://127.0.0.1:8000/api/auth/refresh-token'
  //       )
  //       const accessToken = data.accessToken
  //       config.headers.authorization = `Bearer ${accessToken}`
  //       setToken(accessToken)
  //       const decoded = jwtDecode(accessToken)
  //       setExp(decoded.exp)
  //       const userInfo = {
  //         uuid: decoded.uuid,
  //         name: decoded.name,
  //         username: decoded.username,
  //         email: decoded.email,
  //       }
  //       const payload = {
  //         isLogin: true,
  //         userInfo,
  //       }
  //     }
  //     return config
  //   },
  //   (error) => Promise.reject(error)
  // )

  const getUsers = async (e) => {
    e.preventDefault()
    try {
      dispatch(getDataUsers())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    refreshToken()
  }, [dispatch])

  return (
    <>
      <HeaderComponent />
      <Container className="mt-5">
        <Button className="btn-dark" onClick={getUsers}>
          Get Data
        </Button>
        <Table striped bordered hover className="mt-2">
          <thead>
            <tr>
              <th>No</th>
              <th> Name</th>
              <th> Username</th>
              <th>Email</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {listUsers &&
              listUsers.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{tanggalIndonesia(user.lastLogin)}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    </>
  )
}

export default TableUser
