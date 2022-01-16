import axios from 'axios';
import {toast} from 'react-toastify';

const baseURL = process.env.REACT_APP_API_URL;
const axiosApi = axios.create({
   baseURL
});
axiosApi.interceptors.response.use((response) => {
   return response?.data;
}, (error) => {
   if (error.response) {
      toast.error(error.response?.data?.message, {type: "error"})
   } else {
      toast.error("An unexpected error occurred", {type: "error"})
   }
   return Promise.resolve();
});
export default axiosApi;
