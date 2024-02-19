import axios from "axios"
import Cookies from "js-cookie"

export const getAuthToken = () => {
  return Cookies.get("auth_token")
}

export const setAuthToken = (token) => {
  Cookies.set("auth_token", token)
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : null
}

axios.defaults.baseURL = "http://localhost:8080/api"
axios.defaults.headers.post["Content-Type"] = "application/json"

export const request = (method, url, data) => {
  let headers = {}
  const authToken = getAuthToken()
  if (authToken) {
    headers = { Authorization: `Bearer ${authToken}` }
  }

  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  })
}
