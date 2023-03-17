import React from 'react';
import Input from "./Input";

const SearchBar = ({query, setQuery}) => {

    return (
        <Input value={query} onChange={(e) => {
            setQuery(e.target.value)
        }
        }/>
    );
};

export default SearchBar;