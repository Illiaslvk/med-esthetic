import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080/api"
axios.defaults.withCredentials = true

let retryCount = 0;
const MAX_RETRIES = 5;

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log("Interceptor caught an error:", error.response.status)
    if (error.response && error.response.status === 401) {

      if(retryCount >= MAX_RETRIES){
        console.log("Max retry limit reached. Stop further retries")
        localStorage.removeItem("userRoles")
        return Promise.reject(error);
      }
      console.log("Attempting to refresh token...")

      retryCount++;

      return request("POST", "/auth/refresh", {})
        .then((res) => {
          if (res.status === 200) {
            console.log("Token refreshed successfully.")
            const config = error.response.config
            return axios(config)
          }
        })
        .catch((refreshError) => {
          localStorage.removeItem("userRoles")
          console.error("Token refresh failed:", refreshError)
        })
    }
    return Promise.reject(error)
  }
)

export const request = (method, url, data) => {
  return axios({
    method: method,
    url: url,
    data: data || {}, // use data otherwise empty object
  })
}