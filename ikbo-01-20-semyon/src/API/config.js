export const API = 'http://localhost:8080';

export const getHeaders = (authToken) => {
    return {
        'Authorization': authToken,
        'Access-Control-Allow-Origin': '*'
    }
}