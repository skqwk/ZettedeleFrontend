import axios from "axios";
import {API, getHeaders} from "./config";

export class UserService {

    static async getProfile(authToken) {
        const rs = await axios.get(`${API}/profile`, {
            headers: getHeaders(authToken)
        });
        console.log(rs)
        return rs;
    }

    static async getUsers(authToken) {
        console.log(API);
        console.log(process.env);
        console.log(process.argv);
        const rs = await axios.get(`${API}/admin/users`, {
            headers: getHeaders(authToken)
        });
        console.log(rs)
        return rs;
    }

    static async changeVisibility(authToken, isVisible) {
        const rs = await axios.post(`${API}/changeVisibility`, {}, {
            params: {
                isVisible
            },
            headers: getHeaders(authToken)
        });
        console.log(rs)
        return rs;
    }

    static async getVisibility(authToken) {
        const rs = await axios.get(`${API}/visibility`, {
            headers: getHeaders(authToken)
        });
        console.log(rs)
        return rs;
    }
}