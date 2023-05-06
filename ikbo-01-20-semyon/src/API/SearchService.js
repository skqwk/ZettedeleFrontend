import axios from "axios";

export default class SearchService {
    static API = 'https://jsonplaceholder.typicode.com';

    static async getAllUsers() {
        return await axios.get(`${this.API}/users`);
    }

}