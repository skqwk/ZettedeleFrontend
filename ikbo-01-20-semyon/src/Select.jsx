import React from 'react';
import './Select.css';

const Select = ({options, defaultValue, value, onChange}) => {
    return (
        <div className="select-container">
            <select
                className="select"
                value={value}
                onChange={event => onChange(event.target.value)}
            >
                <option disabled value="">{defaultValue}</option>
                {options.map(option =>
                    <option key={option.value} value={option.value}>{option.name}</option>
                )}
            </select>
        </div>
    );
};

export default Select;