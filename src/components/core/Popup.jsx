import React, { useState, useEffect } from 'react';
import MyButton from '../util/MyButton.jsx';
import Fade from 'react-reveal/Fade';

const Popup = (props) => {
    const [state, setState] = useState({
        time: 'start',
        title: 'Witamy w teście rekrutacyjnym na stanowisko - Ambasador WEBTECH SOLUTIONS',
        text: 'Do rozwiązania testu nie używaj Internetu ani ChatGPT <br /><br />',
        buttonText: 'Rozpocznij test'
    });

    const { startQuiz, score, total, style } = props;

    const popupHandle = () => {
        const { time } = state;

        if (time === 'start') {
            setState({
                time: 'end',
                title: 'Dziękujemy za rozwiązanie testu!',
                buttonText: 'Spróbuj jeszcze raz'
            });

            startQuiz();
        } else {
            location.reload(); // restart the application
        }
    };

    const createMarkup = (text) => ({ __html: text });

    useEffect(() => {
        setState({
            ...state,
            text: `Koniec testu. <br /> Otrzymałeś: <strong>${score}</strong> na <strong>${total}</strong> puntków.`
        });
    }, [score, total]);

    const { title, text, buttonText } = state;

    return (
        <Fade delay={500}>
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="ml-5 col-md-10 col-10">
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={createMarkup(text)} />
                            <span onClick={popupHandle}>
                                <MyButton text={buttonText} bck='#0d0d0e' color='#fff' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Popup;
