export const API = `http://${process.env.REACT_APP_BACKEND_HOST}:8080`;

export const getHeaders = (authToken) => {
    return {
        'Authorization': authToken,
        'Access-Control-Allow-Origin': '*'
    }
}