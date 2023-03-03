import axios, { AxiosResponse } from 'axios';
import { UserI } from '../interfaces/user';
import { UserLoginI } from '../interfaces/userLogin';

const LOGIN_API = 'https://eccotpv-webservice.onrender.com/user/login/';
// const LOGIN_API = 'http://localhost:3800/user/login/';

const REGISTER_API = 'https://eccotpv-webservice.onrender.com/user';
// const REGISTER_API = 'http://localhost:3800/user';

export function login(user: UserLoginI): Promise<AxiosResponse> {
    return axios.post(LOGIN_API, user);
}

export function register(user: UserI): Promise<AxiosResponse> {
    return axios.post(REGISTER_API, user);
}
