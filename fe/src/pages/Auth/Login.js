import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Gap, InputForm } from '../../components'
import { useNavigate } from 'react-router-dom'
import { login } from '../../redux/action'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const stateGlobal = useSelector((state) => state.globalReducer)
  const { auth } = stateGlobal
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      dispatch(login(username, password))
      navigate('/')
    } catch (error) {
      setMessage(error.message)
    }
  }

  useEffect(() => {
    if (auth.isLogin) navigate('/')
  }, [dispatch])

  return (
    <>
      <Gap height={100} />
      <Row className="d-flex justify-content-center">
        <Col lg={4} xl={4} md={4} sm={12}>
          <ul
            className="nav nav-pills nav-justified mb-3"
            id="ex1"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <Link
                to="/login"
                className="nav-link active"
                id="tab-login"
                data-mdb-toggle="pill"
                role="tab"
                aria-controls="pills-login"
                aria-selected="true"
              >
                Login
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link
                className="nav-link"
                id="tab-register"
                data-mdb-toggle="pill"
                to="/register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="false"
              >
                Register
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <h3 className="text-danger">{message}</h3>
            <div
              className="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            >
              <form onSubmit={handleLogin}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <InputForm
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    id="username"
                  />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <InputForm
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign in
                </button>
                <div className="text-center">
                  <p>
                    Not a member? <a href="#!">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Login
