import React, { useState, useEffect } from 'react';
import data from '../questions_data/data';
import Answers from './Answers.jsx';
import Popup from './Popup.jsx';

const Main = () => {
    const [state, setState] = useState({
        count: 0,
        total: data.length,
        showButton: false,
        questionAnswered: false,
        score: 0,
        displayPopup: 'flex',
        question: '',
        answers: [],
        correct: null,
    });

    useEffect(() => {
        const { count } = state;
        insertData(count);
    }, []);

    const insertData = (count) => {
        setState(prevState => ({
            ...prevState,
            question: data[count].question,
            answers: [...data[count].answers],
            correct: data[count].correct,
            count: prevState.count + 1
        }));
    };

    const handleShowButton = () => {
        setState(prevState => ({
            ...prevState,
            showButton: true,
            questionAnswered: true
        }));
    };

    const nextQuestion = () => {
        const { count, total } = state;

        if (count === total) {
            setState(prevState => ({
                ...prevState,
                displayPopup: 'flex'
            }));
        } else {
            insertData(count);
            setState(prevState => ({
                ...prevState,
                showButton: false,
                questionAnswered: false
            }));
        }
    };

    const handleStartQuiz = () => {
        setState(prevState => ({
            ...prevState,
            displayPopup: 'none',
            count: 1
        }));
    };

    const handleIncreaseScore = () => {
        setState(prevState => ({
            ...prevState,
            score: prevState.score + 1
        }));
    };

    const { count, total, question, answers, correct, showButton, questionAnswered, displayPopup, score } = state;

    return (
        <div className="container text-center">
            <Popup style={{ display: displayPopup }} score={score} total={total} startQuiz={handleStartQuiz} />
            <div className="row">
                <div className="col-lg-12 col-md-10 mx-auto">
                    <div id="question">
                        <h4 className="bg-light">Pytanie {count}/{total}</h4>
                        <p>{question}</p>
                    </div>
                    <Answers
                        answers={answers}
                        correct={correct}
                        showButton={handleShowButton}
                        isAnswered={questionAnswered}
                        increaseScore={handleIncreaseScore}
                    />
                    <div id="submit">
                        {showButton ?
                            <button className="fancy-btn" onClick={nextQuestion}>
                                {count === total ? 'Zakończ test' : 'Następne pytanie'}
                            </button> : <span></span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
