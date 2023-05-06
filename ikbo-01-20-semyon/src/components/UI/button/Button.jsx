import React from 'react';
import classes from './Button.module.css';

const Button = ({children, type, disabled, ...props}) => {
    const rootClasses = [classes.button];
    if (disabled) {
        rootClasses.push(classes.disabled)
    }

    const colorTypes = {
        'primary': '#2196F3',
        'secondary': '#F9C975',
        'warning': '#F59475',
    }

    const backgroundColor = disabled ? 'lightgrey'
        : colorTypes[type ? type : 'primary']

    return (
        <button className={rootClasses.join(' ')} disabled={disabled}
                style={{backgroundColor}} {...props}>
            {children}
        </button>
    );
};

export default Button;