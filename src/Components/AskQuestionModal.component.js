import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './css/FAQ.css'

class AskQuestionsModal extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showModal: this.props.showModal,
            content: this.props.content,
            title: this.props.title
        };
        this.close = () => {
            this.setState({ showModal: this.props.showModal });
        };
    }
    /**
     * Function to show the model using the state
     * from another .js file - hence use of props
     *
     * @param {*} nextProps
     * @memberof AskQuestionModal
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal
        })
    }
    /**
     * Function to post a comment to the database using 
     * /Questions/PostQ
     * Once the comment has been sent, it reloads the
     * home page
     *
     * @memberof AskQuestionModal
     */
    postQuestion = (e) => {
        e.preventDefault();
        
        let questionContent = document.getElementById("textQuestion").value
        
        if(questionContent.length>1){
            if(questionContent.substring(questionContent.length,questionContent.length-1)!="?"){
                questionContent = questionContent + "?"

            }
            let data = {
                
                "userID": 1,                                                                  //We create a variable called data and store what is currently in the state into it
                "question": questionContent
            }
            fetch(`http://localhost:4001/Questions/PostQ`, {                                    //This is the fetch request that actually communicates with the backend
                method: 'POST',                                                             //This defines the method as a POST method
                headers: {
                    'Content-Type': 'application/json',                                     //This converts it into JSON format
                },
                body: JSON.stringify(data)
            })
                .then(response => {                                                         //Error handling
                    if (response.status === 200) {
                        window.location.replace(`http://localhost:3000/`);
                    } else {
                        alert('Failed to post Question');
                    };
                })
        }

        else {
            alert("Please Enter a Question")
        }
            
            
        }
    


    render() {
        return (
            <Modal
                show={this.state.showModal}
                onHide={this.props.close ? this.props.close : this.close}
                backdrop={true}
                backdropClassName="backdrop-style"
                dialogClassName="modal-style"
                aria-labelledby="modal-label"
            >
                <Modal.Header closeButton={true}>
                    <h4 id="modal-label" className="overlay-title">Ask A Question</h4>
                </Modal.Header>
                <Modal.Body>
                    {this.state.content}
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant='primary' onClick={this.postQuestion}> Submit
                    </Button><br></br>
                    <Button variant='secondary' onClick={this.props.close ? this.props.close : this.close}> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default AskQuestionsModal;
