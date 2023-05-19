import axios from 'axios'

const newRequest = axios.create({
    baseURL: "http://localhost:7000/api/",
    withCredentials: true,
});

export default newRequest;