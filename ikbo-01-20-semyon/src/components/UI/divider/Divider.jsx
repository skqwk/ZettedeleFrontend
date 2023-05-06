import React from 'react';
import classes from "./Divider.module.css";

const Divider = ({click}) => {
    return (
        <div className={classes.dividerContainer}>
            <div className={classes.divider}/>
            <div className={classes.add}
                 onClick={click}
            >+
            </div>
            <div className={classes.divider}/>
        </div>
    );
};

export default Divider;