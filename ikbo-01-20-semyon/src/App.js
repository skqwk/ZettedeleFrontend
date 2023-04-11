import './App.css';
import {appPath, getFiles} from './core/FileManager';
import {useEffect, useMemo, useState} from "react";
import {dataPath, Db} from "./db/db";
import {v4 as uuidv4} from 'uuid';

function App() {
    const [path, setPath] = useState(appPath);
    const [note, setNote] = useState("");
    const [searchPath, setSearchPath] = useState(appPath);
    const [rows, setRows] = useState([]);
    const [needRefresh, setNeedRefresh] = useState(false);
    const files = useMemo(() => Db.getAllNotes(path), [needRefresh]);


    const createNote = () => {
        Db.createNote({id: uuidv4(), content: note})
        setNote('');
        setNeedRefresh(!needRefresh);
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Все заметки сохраняются в {dataPath}
                </p>
                <div>Заметки</div>
                {files.map(file =>
                    <div>{file}</div>)}
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={5} cols={20}/>
                <button onClick={e => createNote()}>Создать заметку</button>

            </header>
        </div>
    );
}

export default App;
