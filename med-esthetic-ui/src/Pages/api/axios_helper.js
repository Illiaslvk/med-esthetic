import axios from "axios"

axios.defaults.baseURL = "http://localhost:8080/api"
axios.defaults.withCredentials = true

// Axios Response Interceptor
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log("Interceptor caught an error:", error.response.status)
    // Check if it's a 401 response
    if (error.response && error.response.status === 401) {
      // Attempt to refresh the token
      console.log("Attempting to refresh token...")

      return request("POST", "/auth/refresh", {})
        .then((res) => {
          if (res.status === 200) {
            // Retry the original request
            console.log("Token refreshed successfully.")
            const config = error.response.config
            return axios(config)
          }
        })
        .catch((refreshError) => {
          // Handle failed refresh (redirect to login)
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
    data: data,
  })
}