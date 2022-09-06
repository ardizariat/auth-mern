import axios from 'axios'

export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const user = await axios.post(
    'http://127.0.0.1:8000/api/auth/login',
    {
      username,
      password,
    },
    config
  )
  const userInfo = user.data.data
  const payload = {
    isLogin: true,
    userInfo,
  }
  dispatch({ type: 'LOGIN', payload })
}
