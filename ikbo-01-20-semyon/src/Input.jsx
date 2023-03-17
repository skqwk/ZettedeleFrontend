import React from 'react';
import './Input.css';
const Input = ({placeholder, ...props}) => {
    return (
        <div className="input-container">
            {placeholder && <p>{placeholder}</p>}
            <input {...props} className="in"/>
        </div>
    );
};

export default Input;