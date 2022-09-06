import axios from 'axios'
import jwtDecode from 'jwt-decode'

const axiosJWT = axios.create()
axiosJWT.interceptors.request.use(
  async (config) => {
    const now = new Date().getTime()
    const { data } = await axios.get(
      'http://127.0.0.1:8000/api/auth/refresh-token'
    )
    const accessToken = data.accessToken
    config.headers.authorization = `Bearer ${accessToken}`
    const decoded = jwtDecode(accessToken)
    return config
  },
  (error) => Promise.reject(error)
)

export const getDataUsers = () => async (dispatch) => {
  //   const config = {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   }
  const { data } = await axiosJWT.get('http://127.0.0.1:8000/api/user')

  dispatch({ type: 'GET_USERS', payload: data.data })
}
