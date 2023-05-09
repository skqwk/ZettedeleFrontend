import React from 'react';
import classes from './Modal.module.css';

const Modal = ({children, visible, close, backgroundColor}) => {
    const rootClasses = [classes.modal];
    if (visible) {
        rootClasses.push(classes.active)
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => close()}>
            <div className={classes.modalContent} style={{backgroundColor}}
                 onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;