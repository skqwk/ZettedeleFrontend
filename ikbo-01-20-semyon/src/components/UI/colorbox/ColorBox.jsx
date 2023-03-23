import React from 'react';
import classes from './ColorBox.module.css'

const ColorBox = ({color, chosen, ...props}) => {
    const rootClasses = [classes.colorBox];
    if (chosen) {
        rootClasses.push(classes.chosen)
    }


    return (
        <div className={rootClasses.join(' ')} style={{backgroundColor: color}} {...props}>

        </div>
    );
};

export default ColorBox;