import axios from "axios";

export class SyncService {

    static API = 'http://localhost:8080';

    static async getEvents(vectorVersion, authToken) {
        console.log(vectorVersion);

        const rs = await axios.post(`${this.API}/sync`, {
            ...vectorVersion
        }, {
            headers: {
                'Authorization': authToken,
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log(rs)
        return rs;
    }

    static async sendEvents(events, authToken) {
        const rs = await axios.post(`${this.API}/share`, events, {
            headers: {
                'Authorization': authToken,
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log(rs)
        return rs;
    }
}