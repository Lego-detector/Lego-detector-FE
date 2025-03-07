import axios from 'axios';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_UPLOAD_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2IzOGFkOTRhMTdlMzc1Y2YxM2FjYjIiLCJpYXQiOjE3NDEwMzQ5MzcsImV4cCI6MTc0MTEyMTMzN30.0_fUqSW98wnYIWo6-Gxak_Nr6mw6boQKK3dCoKqqec8`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

