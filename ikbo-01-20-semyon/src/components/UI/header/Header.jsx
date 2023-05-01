import React from 'react';
import classes from "./Header.module.css";

const Header = ({size, mt = "25px", mb = "25px", children, ...props}) => {
    return (
        <div style={{fontSize: size, marginTop: mt, marginBottom: mb}} className={classes.header} {...props}>
            {children}
        </div>
    );
};

export default Header;