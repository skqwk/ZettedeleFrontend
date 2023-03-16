import React, {useState} from 'react';
import Input from "./Input";

const SearchBar = () => {
    const [search, setSearch] = useState("");
    console.log(search);

    return (
        <Input value={search} onChange={(e) => {setSearch(e.target.value)}
        }/>
    );
};

export default SearchBar;