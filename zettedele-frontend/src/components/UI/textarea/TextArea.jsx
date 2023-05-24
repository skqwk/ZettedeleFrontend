import React from 'react';
import classes from './TextArea.module.css'

const TextArea = ({children, ...props}) => {
    return (
        <textarea className={classes.textArea} {...props}>

        </textarea>
    );
};

export default TextArea;