import React, {useEffect, useState} from 'react';
import {UserService} from "../API/UserService";
import {useSelector} from "react-redux";
import UserInfo from "../components/UI/userinfo/UserInfo";
import Header from "../components/UI/header/Header";
import SearchBar from "../components/SearchBar";

const Users = () => {
    const auth = useSelector(state => state.auth);
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("")
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        UserService.getUsers(auth.authToken)
            .then(rs => {
                console.log(rs.data);
                setUsers(rs.data);
                setFilteredUsers(rs.data);
            })
    }, [])

    useEffect(() => {
        let filtered = users.filter(u => u.login.toLowerCase().includes(query.toLowerCase()));
        setFilteredUsers(filtered);
    }, [query])


    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <SearchBar query={query} setQuery={setQuery}/>
            </div>
            <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                <div style={{width: '120px', height: '20px'}}/>
                <Header mt={0} mb={0}>ЛОГИН</Header>
                <Header mt={0} mb={0}>ПОСЛЕДНЯЯ АВТОРИЗАЦИЯ</Header>
                <Header mt={0} mb={0}>РОЛЬ</Header>
                <Header mt={0} mb={0}>ВИДИМОСТЬ</Header>
            </div>
            {filteredUsers.map(user =>
                <UserInfo user={user} key={user.login}/>
            )}
        </div>
    );
};

export default Users;