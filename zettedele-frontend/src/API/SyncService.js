import axios from "axios";
import {API, getHeaders} from "./config";

export class SyncService {

    static async getEvents(vectorVersion, authToken) {
        console.log(vectorVersion);

        const rs = await axios.post(`${API}/sync`, {
            ...vectorVersion
        }, {
            headers: getHeaders(authToken)
        });
        console.log(rs)
        return rs;
    }

    static async sendEvents(events, authToken) {
        const rs = await axios.post(`${API}/share`, events, {
            headers: getHeaders(authToken)
        });
        console.log(rs)
        return rs;
    }
}