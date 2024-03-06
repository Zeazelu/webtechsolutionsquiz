import React, { Component } from 'react';
import MyButton from '../util/MyButton.jsx';
import Fade from 'react-reveal/Fade';
class Popup extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            time: 'start',
            title: 'Witamy w teście rekrutacyjnym na ambasadora WEBTECH SOLUTIONS',
            text: 'Do rowzwiązania nie używaj Internetu ani ChatGPT <br /><br />',
            buttonText: 'Rozpocznij test' 
        };
        
        this.popupHandle = this.popupHandle.bind(this);
    }
    
    popupHandle() {
        let { time } = this.state;
        
        if(time === 'start'){
            this.setState({
                time: 'end',
                title: 'Gratulacje!',
                buttonText: 'Spróbuj jeszcze raz'
            });

            //alert("START THE QUIZ");
            this.props.startQuiz();
        } else {
            
            //alert("FINISHED QUIZ");            
            location.reload();// restart the application
        }
    }
     
    createMarkup(text) {
        return {__html: text};
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            text: 'Koniec testu. <br /> Otrzymałeś: <strong>' + this.props.score + 
            '</strong> na <strong>' + 
            this.props.total +
            '</strong> pytań.'
        })
    }

    
    render() {
       
        let { title, text, buttonText } = this.state;
        
        let { style } = this.props;
        
        return (
            <Fade delay={500}>
                <div className="popup-container" style={style}>
                    <div className="container">
                        <div className="ml-5 col-md-10 col-10">
                            <div className="popup">
                                <h1>{title}</h1>
                                <p dangerouslySetInnerHTML={this.createMarkup(text)} />
                                <span onClick={this.popupHandle}>
                                    <MyButton
                                        text={buttonText}
                                        bck='#FF9800'
                                        color='#fff'
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

