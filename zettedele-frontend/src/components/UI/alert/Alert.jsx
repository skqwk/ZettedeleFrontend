import React from 'react';
import classes from "./Alert.module.css";

const Alert = ({children, ...props}) => {
    return (
        <div className={classes.alert} {...props}>
            <div className={classes.body}>
                <div className={classes.icon}>
                    <span role="img" aria-label="error">⛔</span>
                </div>
                <div className={classes.content}>{children}</div>
            </div>
        </div>
    );
};

export default Alert;