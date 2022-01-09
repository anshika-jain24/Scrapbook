import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000'});

API.interceptors.request.use( (req) => {
    if(localStorage.getItem('profile')){
        req.headers.authorization = `Bearer ${localStorage.getItem('profile')}`;
    }
    return req;
});

export const signIn = (email, password) => API.post('/api/auth/login', {email, password});
export const signUp = (email, password, name) => API.post('/api/auth/signup', {email,password,name});