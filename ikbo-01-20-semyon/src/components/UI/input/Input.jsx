import React from 'react';
import classes from './Input.module.css';

const Input = ({placeholder, ...props}) => {
    return (
        <div className={classes.inputContainer}>
            {placeholder && <p>{placeholder}</p>}
            <input {...props} className={classes.in}/>
        </div>
    );
};

export default Input;