import axios from "axios";

export default class AuthService {
    static API = 'http://localhost:8080';

    static async auth(login, password) {
        const rs = await axios.post(`${this.API}/auth`, {
            login,
            password
        });
        console.log(rs)

        return rs;
    }

    static async register(login, password) {
        return await axios.post(`${this.API}/register`, {
            login,
            password
        })
    }

}