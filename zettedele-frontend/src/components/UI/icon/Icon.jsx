import React from 'react';
import classes from "./Icon.module.css";
import {colors} from "../../../core/ui/colors";
const Icon = ({label, icon, size=90, color=colors.white}) => {

    const heightSize = size + 'px';
    const widthSize = size + 'px';
    const fontSize = size / 2.25 + 'px'

    return (
        <div className={classes.icon} style={{background: color, height: heightSize, width: widthSize}}>
            <span role="img" aria-label={label} style={{marginBottom: '5px', fontSize}}>{icon}</span>
        </div>
    );
};

export default Icon;