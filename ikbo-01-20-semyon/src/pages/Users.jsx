import React, {useEffect, useState} from 'react';
import {UserService} from "../API/UserService";
import {useSelector} from "react-redux";
import UserInfo from "../components/UserInfo";

const Users = () => {
    const auth = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService.getUsers(auth.authToken)
            .then(rs => {
                console.log(rs.data);
                setUsers(rs.data);
            })
    }, [])


    return (
        <div>
            {users.map(user =>
                <UserInfo user={user}/>
            )}
        </div>
    );
};

export default Users;