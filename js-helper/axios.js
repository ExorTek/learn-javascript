const axios = require('axios');
const apiAxios = axios.create({
    baseURL: process.env.BASE_URL,
});
apiAxios.interceptors.response.use((response) => response, (error) => Promise.reject(error));
apiAxios.interceptors.request.use((req) => req);
module.exports = apiAxios;