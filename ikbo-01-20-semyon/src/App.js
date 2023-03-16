import './App.css';
import React, {useEffect} from 'react';
import Navbar from "./Navbar";

const App = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./mouseTracker.js"
        document.body.appendChild(script)
        return () => {
            // clean up the script when the component in unmounted
            document.body.removeChild(script)
        }
    }, [])

    return (
        <div className="App">
            <div className="about-container">
                <h1>Zettedele</h1>
                <Navbar/>
                <div className="frozen-container">
                    <div className="content">
                        <p className="text__center">Zettedele - это система ведения заметок и управления личными
                            знаниями,
                            построенная на основе метода
                            Zettelkasten
                        </p>
                        <br/>
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

            </div>
        </div>
    );
}
export default App;
