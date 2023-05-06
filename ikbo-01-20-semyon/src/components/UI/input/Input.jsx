import React from 'react';
import classes from './Input.module.css';

const Input = ({inputName, ...props}) => {
    return (
        <div className={classes.inputContainer}>
            {inputName && <p>{inputName}</p>}
            <input {...props} className={classes.in}/>
        </div>
    );
};

export default Input;