import React, {useEffect} from 'react';
import '../styles/App.css';

const About = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./mouseTracker.js";
        console.log('Add script');
        document.body.appendChild(script);
        return () => {
            // clean up the script when the component in unmounted
            document.body.removeChild(script);
            console.log('Remove script');
        }
    }, [])

    return (
        <div className="about-container">

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
        </div>);
};

export default About;