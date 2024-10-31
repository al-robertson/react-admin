import axios from 'axios';

const api = axios.create({
    baseURL: 'http://funkypuppy.co.uk:8000'
})

export default api;