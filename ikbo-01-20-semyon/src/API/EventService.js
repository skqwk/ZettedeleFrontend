import axios from "axios";
import {API, getHeaders} from "./config";

export class EventService {

    static async sendAllEvents(events, authToken) {
        const rs = await axios.post(`${API}/events/upload`, events, {
            headers: getHeaders(authToken)
        });
        console.log(rs)
        return rs;
    }

    static async getAllEvents(authToken) {
        const rs = await axios.get(`${API}/events/download`, {
            headers: getHeaders(authToken)
        });
        console.log(rs)
        return rs;
    }
}