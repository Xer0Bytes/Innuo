import axios from 'axios'

const newRequest = axios.create({
    baseURL: "https://localhost:7000/api",
    withCredentials: true,
});

export default newRequest;