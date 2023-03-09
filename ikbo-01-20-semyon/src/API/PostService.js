import axios from "axios";

export default class PostService {
    static SERVER = 'https://jsonplaceholder.typicode.com';

    static async getAll(limit = 10, page = 1) {
        const response = await axios.get(`${this.SERVER}/posts`, {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return response;
    }
}