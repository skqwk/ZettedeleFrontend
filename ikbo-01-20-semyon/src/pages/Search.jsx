import React, {useState} from 'react';
import SearchBar from "../components/SearchBar";
import RoundButton from "../components/UI/roundbutton/RoundButton";
import Select from "../components/UI/select/Select";

const Search = () => {

    const [query, setQuery] = useState('');
    const [selectedValue, setSelectedValue] = useState('');
    const options = [
        {name: 'Пользователи', value: 'users'},
        {name: 'Хранилища', value: 'vaults'},
        {name: 'Заметки', value: 'notes'},
    ]

    const search = (e) => {
        console.log("Search!")
    }

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
            <SearchBar query={query} setQuery={setQuery}/>
            <Select value={selectedValue} onChange={setSelectedValue} options={options} defaultValue="Что искать?"/>
            <RoundButton onClick={e => search(e)}><span role="img" aria-label="loupe">🔍</span>︎</RoundButton>
        </div>
    );
};

export default Search;