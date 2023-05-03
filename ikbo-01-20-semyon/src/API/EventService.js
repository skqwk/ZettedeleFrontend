import axios from "axios";

export class EventService {
    static API = 'http://localhost:8080';

    static async sendAllEvents(events, authToken) {
        const rs = await axios.post(`${this.API}/events/upload`, events, {
            headers: {
                'Authorization': authToken,
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log(rs)
        return rs;
    }

    static async getAllEvents(authToken) {
        const rs = await axios.get(`${this.API}/events/download`, {
            headers: {
                'Authorization': authToken,
                'Access-Control-Allow-Origin': '*'
            }
        });
        console.log(rs)
        return rs;
    }
}