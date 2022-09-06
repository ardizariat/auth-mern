import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'

import { App } from './pages'
import './assets/css/bootstrap.min.css'

axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
