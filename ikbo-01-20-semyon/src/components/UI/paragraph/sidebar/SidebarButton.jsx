import React from 'react';
import classes from "./Sidebar.module.css";
const SidebarButton = ({...props}) => {
    return (
        <div className={classes.sidebarButton} {...props}>
            ✖
        </div>
    );
};

export default SidebarButton;