import React from 'react';
import classes from './RoundButton.module.css';
const RoundButton = ({children, ...props}) => {
    return (
        <button className={classes.roundButton} {...props}>
            {children}
        </button>
    );
};

export default RoundButton;