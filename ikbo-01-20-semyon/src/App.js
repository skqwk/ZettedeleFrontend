import './App.css';
import React from 'react';

const App = () => {
    return (
        <div className="App">
            <div className="about-container">
                <h1>Zettedele</h1>
                <ul className="navbar">
                    <li className="navbar-item">Профиль</li>
                    <li className="navbar-item">Хранилища</li>
                    <li className="navbar-item">Поиск</li>
                </ul>
                <div className="frozen-container">
                    <div className="content">
                        <p className="text__center">Zettedele - это система ведения заметок и управления личными
                            знаниями,
                            построенная на основе метода
                            Zettelkasten
                        </p>
                        <p className="text__center">
                            Важные мысли не потеряются: каждую заметку можно связать ссылкой с другой заметкой,
                            использование
                            графа для визуализации
                            гарантирует наглядность базы знаний, а система тегов позволяет классифицировать заметки.
                        </p>
                    </div>
                    <div className="circle-blue"></div>
                    <div className="circle-pink"></div>
                </div>

                <div className="box">
                    <div className="box-content">

                    </div>
                </div>

            </div>
        </div>
    );
}
export default App;
