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
            <div style={{width: "60%"}}>
                <Input inputName="ЛОГИН" readOnly value={profile.login}/>
                <Input inputName="ИМЯ" readOnly value={profile.name}/>
                <Input inputName="ФАМИЛИЯ" readOnly value={profile.surname}/>
                <Input inputName="ОТЧЕСТВО" readOnly value={profile.lastname}/>
            </div>
        </div>
    );
};

export default Profile;