import React from 'react';
import {colors} from "../../../core/ui/colors";
import classes from './Label.module.css'
const Label = ({value, color=colors.blue}) => {
    return (
        <div className={classes.label} style={{background: color}}>{value}</div>
    );
};

export default Label;