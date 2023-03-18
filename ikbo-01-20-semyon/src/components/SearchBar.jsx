import React from 'react';
import Input from "./UI/input/Input";

const SearchBar = ({query, setQuery}) => {

    return (
        <div style={{width: "60%"}}>
            <Input value={query} onChange={(e) => {
                setQuery(e.target.value)
            }
            }/>
        </div>
    );
};

export default SearchBar;