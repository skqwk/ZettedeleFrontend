export const API = 'http://95.163.233.136:8080';

export const getHeaders = (authToken) => {
    return {
        'Authorization': authToken,
        'Access-Control-Allow-Origin': '*'
    }
}