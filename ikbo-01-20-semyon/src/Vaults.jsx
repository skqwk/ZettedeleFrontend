import React, {useEffect, useState} from 'react';
import SearchBar from "./SearchBar";
import NoteList from "./NoteList";
import Select from "./Select";

const Vaults = () => {
    const [nowVault, setNowVault] = useState('');


    const vaults = {
        vault1: {
            value: 'vault1',
            name: 'Курсовая работа', notes: [
                {title: 'Выбор темы', content: 'Приложение для заметок', date: '09.02.2023'},
                {title: 'Выбор темы', content: 'Приложение для заметок', date: '09.02.2023'},
                {title: 'Выбор темы', content: 'Приложение для заметок', date: '09.02.2023'},
                {title: 'Выбор темы', content: 'Приложение для заметок', date: '09.02.2023'}
            ]
        },
        vault2: {
            value: 'vault2',
            name: 'Работа', notes: [
                {title: 'Разработка на Java', content: 'IDEA, Maven, Hibernate', date: '09.02.2023'},
                {title: 'Разработка на Java', content: 'IDEA, Maven, Hibernate', date: '09.02.2023'},
                {title: 'Разработка на Java', content: 'IDEA, Maven, Hibernate', date: '09.02.2023'},
                {title: 'Разработка на Java', content: 'IDEA, Maven, Hibernate', date: '09.02.2023'},
            ]
        }
    };

    useEffect(() => {
        console.log('vault is updated');
        console.log(nowVault);
    }, [nowVault])

    const onlyVaults = Object.values(vaults).map(v => ({'name': v.name, 'value': v.value}));

    const extractNotes = (nowVault) => {
        return nowVault
            ? vaults[nowVault].notes
            : [];
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <SearchBar/>
                <Select
                    defaultValue="Выбор хранилища"
                    value={nowVault}
                    onChange={setNowVault}
                    options={onlyVaults}/>
            </div>
            <NoteList notes={extractNotes(nowVault)}/>
        </div>
    );
};

export default Vaults;