// import axios from 'axios';

// // Create an Axios instance with a base URL and other configurations
// const axiosClient = axios.create({
//   baseURL: 'http://localhost:8000/api',
//   withCredentials: true,
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//     // You can add other headers here if needed
//   },
// });

// // Add an interceptor to set the CSRF token for each request
// //X-CSRF-TOKEN
// axios.interceptors.request.use(
//   (config) => {
//     const csrfToken = localStorage.getItem('ACCESS_TOKEN');
//     if (csrfToken) {
//       config.headers['ACCESS_TOKEN'] = csrfToken;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default axiosClient;

import axios from 'axios';

// Create an Axios instance with a base URL and other configurations
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // You can add other headers here if needed
  },
});

// Add an interceptor to set the authorization token for each request
axiosClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;

