import axios from 'axios';

export default axios.create({
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    baseURL: 'http://localhost:4000/api/'
});
