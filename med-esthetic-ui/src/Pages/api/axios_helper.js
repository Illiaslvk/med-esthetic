// import axios from "axios"
//
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080/api',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     withCredentials: true,
// });
//
// // Axios Response Interceptor
// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response
//     },
//     (error) => {
//         console.log("Interceptor caught an error:", error.response.status)
//         if (error.response && error.response.status === 401) {
//             // Attempt to refresh the token
//             console.log("Attempting to refresh token...")
//
//             return axiosInstance.post("/auth/refresh", {}) // Assuming your refresh endpoint is /auth/refresh and it accepts POST requests
//                 .then((res) => {
//                     if (res.status === 200) {
//                         // Update the request headers with the new token
//                         axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
//                         // Retry the original request
//                         console.log("Token refreshed successfully.")
//                         return axiosInstance.request(error.response.config); // Retry the original request
//                     }
//                 })
//                 .catch((refreshError) => {
//                     // Handle failed refresh (redirect to login or other appropriate action)
//                     console.error("Token refresh failed:", refreshError)
//                     throw refreshError; // Re-throw the error to propagate it further
//                 })
//         }
//         return Promise.reject(error)
//     }
// )
//
// export const request = (method, url, data) => {
//     return axiosInstance({
//         method: method,
//         url: url,
//         data: data,
//     })
// }


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
    data: data,
  })
}