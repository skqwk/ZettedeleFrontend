import React from 'react';

const UserInfo = ({user}) => {
    return (
        <div style={{display: "flex", height: "30px"}}>
            <p>{user.login}</p>
            <p>{user.lastAuth}</p>
            <p>{user.visibility}</p>
        </div>
    );
};

export default UserInfo;