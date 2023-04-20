import React from 'react';
import classes from "./Hint.module.css";
const Hint = ({children, ...props}) => {
    return (
        <div className={classes.hint} {...props}>
            <div className={classes.body}>
                <div className={classes.icon}>⚠️</div>
                <div className={classes.content}>{children}</div>
            </div>
        </div>
    );
};

export default Hint;