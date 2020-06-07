import axios from 'axios';

const api = axios.create({
    //baseURL: 'exp://73-i5z.anonymous.mobile.exp.direct:80'
    baseURL: 'http://192.168.2.3:3333/'
});

export default api;