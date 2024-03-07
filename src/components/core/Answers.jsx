import React, { useState, useEffect } from 'react';

const Answers = (props) => {
    const [classNames, setClassNames] = useState(['', '', '', '']);

    const checkAnswer = (index) => {
        if (!props.isAnswered) {
            const { correct, increaseScore, showButton } = props;
            const answer = index + 1;

            const updatedClassNames = [...classNames];

            if (answer === correct) {
                updatedClassNames[index] = 'right';
                increaseScore();
            } else {
                updatedClassNames[index] = 'wrong';
            }

            setClassNames(updatedClassNames);

            showButton();

            // Use setTimeout with functional component
            const timeoutId = setTimeout(() => {
                clearClasses();
            }, 700);

            // Cleanup the timeout on component unmount
            return () => clearTimeout(timeoutId);
        }
    };

    const clearClasses = () => {
        setClassNames(['', '', '', '']);
    };

    const { answers } = props;

    // useEffect to handle component lifecycle
    useEffect(() => {
        // Additional cleanup logic if needed
        return () => {
            clearClasses();
        };
    }, []);

    return (
        <div id="answers">
            <ul>
                {answers.map((answer, index) => (
                    <li
                        key={index}
                        onClick={() => checkAnswer(index)}
                        className={classNames[index]}
                    >
                        <span>{String.fromCharCode(65 + index)}</span>
                        <p>{answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Answers;
