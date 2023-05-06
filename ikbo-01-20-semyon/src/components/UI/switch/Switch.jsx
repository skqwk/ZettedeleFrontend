import React from 'react';
import classes from './Switch.module.css';

const Switch = ({switchName, onToggle, ...props}) => {
    return (
        <div className={classes.switchContainer}>
            {switchName && <p>{switchName}</p>}
            <label className={classes.switch}>
                <input type="checkbox" onChange={onToggle} {...props}/>
                <span className={`${classes.slider} ${classes.round}`}/>
            </label>
        </div>
    );
};

export default Switch;