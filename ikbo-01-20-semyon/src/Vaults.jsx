import React, {useEffect, useState} from 'react';
import SearchBar from "./SearchBar";
import NoteList from "./NoteList";
import Select from "./Select";
import RoundButton from "./RoundButton";

const Vaults = () => {
    const [nowVault, setNowVault] = useState('');
    const [query, setQuery] = useState('');
    const [notes, setNotes] = useState([]);
    const vaults = {
        vault1: {
            value: 'vault1',
            name: 'Курсовая работа', notes: [
                {title: 'Выбор темы', content: 'Приложение для заметок', date: '09.02.2023', id: 1},
                {
                    title: 'Анализ предметной области',
                    content: 'Zettelkasten, EverNote, Google Keep',
                    date: '09.02.2023',
                    id: 2
                },
                {title: 'Программный стек', content: 'Java, Java Script', date: '09.02.2023', id: 3},
                {title: 'Архитектура', content: 'DDD, Clean Architecture', date: '09.02.2023', id: 4},
                {title: 'Реализация FE', content: 'React, Node', date: '09.02.2023', id: 5},
                {title: 'Реализация BE', content: 'Spring Boot', date: '09.02.2023', id: 6}
            ]
        },
        vault2: {
            value: 'vault2',
            name: 'Работа', notes: [
                {title: 'Java Core', content: 'Equals, Hash Code', date: '09.02.2023', id: 6},
                {title: 'Spring Boot 5', content: 'IoC, DI, Bean lifecycle', date: '09.02.2023', id: 7},
                {title: 'JPA Hibernate', content: 'N+1 проблема, ORM', date: '09.02.2023', id: 8},
                {title: 'Spring Web', content: 'Apache Tomcat, REST', date: '09.02.2023', id: 9},
            ]
        }
    };

    useEffect(() => {
        setNotes(extractNotes(nowVault));
    }, [nowVault])

    useEffect(() => {
        let nowNotes = extractNotes(nowVault);
        const filteredNotes = nowNotes.filter(note => {
            return note.title.toLowerCase().includes(query.toLowerCase())
                || note.content.toLowerCase().includes(query.toLowerCase())
        });
        setNotes(filteredNotes);
    }, [query]);

    const onlyVaults = Object.values(vaults).map(v => ({'name': v.name, 'value': v.value}));

    const extractNotes = (nowVault) => {
        return nowVault
            ? vaults[nowVault].notes
            : [];
    }

    const createNewVault = (e) => {
        console.log("Create new vault");
    }

    const createNewNote = (e) => {
        console.log("Create new note");
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
                <SearchBar query={query} setQuery={setQuery}/>
                <RoundButton onClick={createNewNote}><span role="img" aria-label="pen"></span></RoundButton>
                <Select
                    defaultValue="Выбор хранилища"
                    value={nowVault}
                    onChange={setNowVault}
                    options={onlyVaults}/>
                <RoundButton onClick={createNewVault}>+</RoundButton>
            </div>
            <NoteList notes={notes}/>
        </div>
    );
};

export default Vaults;