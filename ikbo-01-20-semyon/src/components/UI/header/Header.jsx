import React from 'react';
import classes from "./Header.module.css";

const Header = ({size, mt = 25, mb = 25, children, ...props}) => {
    const marginTop = mt + 'px';
    const marginBottom = mb + 'px';

    return (
        <div style={{fontSize: size, marginTop, marginBottom}} className={classes.header} {...props}>
            {children}
        </div>
    );
};

export default Header;