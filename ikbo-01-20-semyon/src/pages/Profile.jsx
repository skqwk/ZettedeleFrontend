import React from 'react';
import Input from "../components/UI/input/Input";
import Avatar from "../components/UI/avatar/Avatar";

const Profile = () => {
    const profile = {
        login: 'skqwk',
        name: 'Семён',
        surname: 'Есаев',
        lastname: 'Антонович'
    }

    return (
        <div className="profile">
            <Avatar/>
            <Input placeholder="ЛОГИН" readOnly value={profile.login}/>
            <Input placeholder="ИМЯ" readOnly value={profile.name}/>
            <Input placeholder="ФАМИЛИЯ" readOnly value={profile.surname}/>
            <Input placeholder="ОТЧЕСТВО" readOnly value={profile.lastname}/>
        </div>
    );
};

export default Profile;