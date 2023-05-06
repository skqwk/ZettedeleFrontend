import axios from "axios";
import {API, getHeaders} from "./config";

export default class AuthService {

    static async auth(login, password) {
        const rs = await axios.post(`${API}/auth`, {
            login,
            password
        });
        console.log(rs)

        return rs;
    }

    static async register(login, password) {
        return await axios.post(`${API}/register`, {
            login,
            password
        })
    }

    static async getNodeId(authToken) {
        const rs = await axios.get(`${API}/node`, {
            headers: getHeaders(authToken)
        });
        console.log(rs)
        return rs;
    }
}