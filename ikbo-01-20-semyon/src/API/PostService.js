import axios from "axios";

export default class PostService {
    static SERVER = 'https://jsonplaceholder.typicode.com';

    static async getAll() {
        try {
            const response = await axios.get(`${this.SERVER}/posts`)
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }
}