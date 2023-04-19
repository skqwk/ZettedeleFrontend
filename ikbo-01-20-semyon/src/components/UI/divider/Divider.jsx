import React from 'react';
import classes from "./Divider.module.css";
import {createParagraphEvent} from "../../../store/vaultReducer";
import {useDispatch} from "react-redux";
import {useProfile} from "../../../hooks/useProfile";

const Divider = ({address, prev, next}) => {
    const dispatch = useDispatch();
    const nowUser = useProfile();

    return (
        <div className={classes.dividerContainer}>
            <div className={classes.divider}/>
            <div className={classes.add}
                 onClick={e => dispatch(createParagraphEvent({...address, prev, next, nowUser}))}
            >+</div>
            <div className={classes.divider}/>
        </div>
    );
};

export default Divider;