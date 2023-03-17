import React from 'react';
import './RoundButton.css';
const RoundButton = ({children, ...props}) => {
    return (
        <button className="round-button" {...props}>
            {children}
        </button>
    );
};

export default RoundButton;