import React, {useState} from 'react';
import TextArea from "../components/UI/textarea/TextArea";
import Button from "../components/UI/button/Button";
import axios from "axios";

const Test = () => {
    const [token, setToken] = useState('');
    const [response, setResponse] = useState('');

    const sendRequest = () => {
        getProfile(token)
            .then(rs => {
                console.log(rs)
                setResponse(rs);
            })
            .catch(err => {
                console.log(err);
                setResponse(err);
            })
    }

    const getProfile =  async (authToken) =>  {
        const config = {
            headers: {
                'Authorization': authToken
            }
        }
        return await axios.get(`http://localhost:8080/profile`, config);
    }

    return (
        <div>
            <TextArea value={token} onChange={e => setToken(e.target.value)}/>
            <Button onClick={e => sendRequest()}>ОТПРАВИТЬ</Button>
            <TextArea value={response} readonly/>
        </div>
    );
};

export default Test;