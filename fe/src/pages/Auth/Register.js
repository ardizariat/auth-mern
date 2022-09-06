import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Gap, InputForm } from '../../components'

const Register = () => {
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
                className="nav-link"
                id="tab-login"
                data-mdb-toggle="pill"
                role="tab"
                aria-controls="pills-login"
                aria-selected="false"
              >
                Login
              </Link>
            </li>
            <li className="nav-item" role="presentation">
              <Link
                className="nav-link active"
                id="tab-register"
                data-mdb-toggle="pill"
                to="/register"
                role="tab"
                aria-controls="pills-register"
                aria-selected="true"
              >
                Register
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="pills-login"
              role="tabpanel"
              aria-labelledby="tab-login"
            >
              <form>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <InputForm type="text" id="name" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="username">
                    Username
                  </label>
                  <InputForm type="text" id="username" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <InputForm type="email" id="email" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <InputForm type="password" id="password" />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mb-4"
                >
                  Sign Up
                </button>
                <div className="text-center">
                  <p>
                    member? <a href="#!">Login</a>
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

export default Register
