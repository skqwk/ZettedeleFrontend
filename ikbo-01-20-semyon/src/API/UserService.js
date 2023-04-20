import axios from "axios";

export class UserService {
    static API = 'http://localhost:8080';

    static async getProfile(authToken) {
        const rs = await axios.get(`${this.API}/profile`, {
            headers: {
                'Authorization': authToken,
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log(rs)
        return rs;
    }
}