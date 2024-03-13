import React, { Component } from 'react';
import MyButton from '../util/MyButton.jsx';
import Fade from 'react-reveal/Fade';
import './Popup.css'

class Popup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 'start',
            title: 'Test rekrutacyjny na stanowisko - Ambasador WEBTECH SOLUTIONS',
            text: 'Rozwiązuj test samodzielnie!',
            buttonText: 'Rozpocznij test',
            passwordInput: '', // Dodajemy pole dla wpisywanego hasła
            passwordError: false // Dodajemy pole do śledzenia błędu hasła
        };

        this.popupHandle = this.popupHandle.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    popupHandle() {
        const { time, passwordInput } = this.state;

        if (passwordInput === '1234') {
            if (time === 'start') {
                this.setState({
                    time: 'end',
                    title: 'Dziękujemy za rozwiązanie testu!',
                    buttonText: 'Rozwiąż ponownie',
                    passwordError: false // Resetujemy błąd hasła po poprawnym wprowadzeniu
                });

                this.props.startQuiz();
            } else {
                location.reload(); // restart the application
            }
        } else {
            // Wyświetl błąd, jeśli hasło jest niepoprawne
            this.setState({ passwordError: true });
        }
    }

    handlePasswordChange(event) {
        this.setState({ passwordInput: event.target.value });
    }

    createMarkup(text) {
        return { __html: text };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: 'Koniec testu. <br /> Zdobyłeś <strong>' + this.props.score +
                '</strong> z <strong>' +
                this.props.total +
                '</strong> punktów.'
        })
    }

    render() {

        let { title, text, buttonText, passwordError } = this.state;

        let { style } = this.props;

        return (
            <Fade delay={500}>
                <div className="popup-container" style={style}>
                    <div className="container">
                        <div className="ml-5 col-md-10 col-10">
                            <div className="popup">
                                <h1>{title}</h1>
                                <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                                <input
                                    type="password"
                                    placeholder="Wprowadź hasło"
                                    value={this.state.passwordInput}
                                    onChange={this.handlePasswordChange}
                                />
                                {passwordError && <p style={{ color: 'red' }}>Niepoprawne hasło!</p>}
                                <span onClick={this.popupHandle}>
                                    <MyButton
                                        text={buttonText}
                                        bck='#0d0d0e'
                                        color='#fff'
                                        disabled={passwordError || !this.state.passwordInput} // Wyłącz przycisk, jeśli hasło jest niepoprawne lub nie wpisano żadnego hasła
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        );
    }
}

export default Popup;
