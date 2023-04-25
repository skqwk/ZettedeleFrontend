import React, {useEffect, useState} from 'react';
import SearchBar from "../components/SearchBar";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import Select from "../components/UI/select/Select";
import SearchService from "../API/SearchService";
import '../styles/App.css';
import {useSelector} from "react-redux";
import Hint from "../components/UI/hint/Hint";

const Search = () => {
    const offline = useSelector(state => state.connection.offline);

    const [query, setQuery] = useState('');
    const [selectedValue, setSelectedValue] = useState('users');
    const [items, setItems] = useState([]);
    const [toggle, setToggle] = useState(false);
    const options = [
        {name: 'Пользователи', value: 'users'},
        {name: 'Хранилища', value: 'vaults'},
        {name: 'Заметки', value: 'notes'},
    ]

    useEffect(() => {
        console.log(`Current mode is ${offline ? 'offline' : 'online'}`)
    }, [])

    const search = () => {
        console.log("Search!")
        setToggle(!toggle);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (selectedValue === 'users') {
                let response = await SearchService.getAllUsers();
                setItems(filterUsers(response.data));
            } else {
                setItems([]);
            }
        }
        fetchData();
    }, [selectedValue, toggle])

    const filterUsers = (users) => {
        return users.filter(user => {
            return user.name.toLowerCase().includes(query.toLowerCase())
                || user.username.toLowerCase().includes(query.toLowerCase())
        });
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <SearchBar query={query} setQuery={setQuery}/>
                <Select value={selectedValue} onChange={setSelectedValue} options={options} defaultValue="Что искать?"/>
                <RoundButton onClick={() => search()} disabled={offline}><span role="img"
                                                                               aria-label="loupe">🔍</span>︎</RoundButton>
            </div>
            {offline
                ? offline && <Hint>Подключение к сети отсутствует</Hint>
                : items.length === 0
                    ? "Ничего не найдено"
                    : items.map(item =>
                        <div className="item" key={item.id}>
                            <div className="itemAvatar"/>
                            <div className="itemContent">
                                <h4>{item.name}</h4>
                                <p>{item.username}</p>
                            </div>
                        </div>
                    )
            }

        </div>
    );
};

export default Search;