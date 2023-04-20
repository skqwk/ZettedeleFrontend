import React from 'react';
import classes from "./Header.module.css";

const Header = ({size, children, ...props}) => {
    return (
        <div style={{fontSize: size}} className={classes.header} {...props}>
            {children}
        </div>
    );
};

export default Header;