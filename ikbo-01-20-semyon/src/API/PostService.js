import axios from "axios";

export default class PostService {
    static SERVER = 'https://jsonplaceholder.typicode.com';

    static async getAll(limit = 10, page = 1) {
        return await axios.get(`${this.SERVER}/posts`, {
            params: {
                _limit: limit,
                _page: page
            }
        });
    }

    static async getById(id) {
        return await axios.get(`${this.SERVER}/posts/${id}`);
    }

    static async getCommentsByPostId(id) {
        return await axios.get(`${this.SERVER}/posts/${id}/comments`);
    }
}