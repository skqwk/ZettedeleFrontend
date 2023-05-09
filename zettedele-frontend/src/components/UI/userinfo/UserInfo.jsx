import React from 'react';
import classes from './UserInfo.module.css'
import Icon from "../icon/Icon";
import {colors} from "../../../core/ui/colors";
import Label from "../label/Label";



const UserInfo = ({user}) => {

    const isVisible = user.visibility === 'PUBLIC';
    const isAdmin = user.role === 'ADMIN'

    return (
        <div className={classes.userInfo}>
            <Icon label={"profile"} icon={"👤"}/>
            <p>{user.login}</p>
            <p>{user.lastAuth}</p>
            <Label value={user.role} color={isAdmin ? colors.violet : colors.orange}/>
            <Icon size={60} label={"visibility"} icon={isVisible ? "🔓" : "🔒"} color={isVisible ? colors.green : colors.red}/>
        </div>
    );
};

export default UserInfo;