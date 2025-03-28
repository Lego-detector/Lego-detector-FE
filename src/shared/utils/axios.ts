import axios from 'axios';

// ----------------------------------------------------------------------
const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2IzOGFkOTRhMTdlMzc1Y2YxM2FjYjIiLCJpYXQiOjE3NDMxNDQ4OTksImV4cCI6MTc0MzIzMTI5OX0.amP_8CP7mMRRvAXX-xfc5Y4MhPx6VBfylW0gOwsvZBc';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_UPLOAD_URL,
  headers: {
    Authorization: `Bearer ${mockToken}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

