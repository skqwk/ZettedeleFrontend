import React from 'react';
import classes from "./Divider.module.css";
import {createParagraphEvent} from "../../../store/vaultReducer";
import {useDispatch, useSelector} from "react-redux";

const Divider = ({address, prev, next}) => {
    const dispatch = useDispatch();
    const nowUser = useSelector(state => state.user.name);

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