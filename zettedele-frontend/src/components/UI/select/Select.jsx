import React from 'react';
import classes from './Select.module.css';

const Select = ({options, defaultValue, value, onChange}) => {
    return (
        <div className={classes.selectContainer}>
            <select
                value={value}
                onChange={event => onChange(event.target.value)}
            >
                <option key={'default'} disabled value="">{defaultValue}</option>
                {options.map(option =>
                    <option key={option.value} value={option.value}>{option.name}</option>
                )}
            </select>
        </div>
    );
};

export default Select;