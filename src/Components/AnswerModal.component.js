import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './css/FAQ.css'
class AnswerQuestionsModal extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showModal1: this.props.showModal1,
            content: this.props.content,
            title: this.props.title,
            textAnswer:""
        };
        this.close = () => {
            this.setState({ showModal1: this.props.showModal1 });
        };
    }

    /**
     * Function to show the model using the state
     * from another .js file - hence use of props
     *
     * @param {*} nextProps
     * @memberof AnswerQuestionsModal
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal1: nextProps.showModal1
        })
    }

    /**
     * Function to post an answer to the database using 
     * /Answers/PostA
     * Once answer has been sent, it reloads the overall
     * answers page
     *
     * @memberof AnswerQuestionsModal
     */
    postAnswer = (e) =>{
        e.preventDefault();
        if(document.getElementById("textAnswer").value.length>1){
            this.setState({
            textAnswer:document.getElementById("textAnswer").value
        }, () => {
            let data = {
                "q_id": sessionStorage.getItem("q_id"),
                "u_id": 71,                                                                  //We create a variable called data and store what is currently in the state into it
                "answer":this.state.textAnswer
            }
            fetch(`http://localhost:4001/Answers/PostA`, {                                    //This is the fetch request that actually communicates with the backend
                method: 'POST',                                                             //This defines the method as a POST method
                headers: {
                    'Content-Type': 'application/json',                                     //This converts it into JSON format
                },
                body: JSON.stringify(data)
            })
                .then(response => {                                                         //Error handling
                    if (response.status === 200) {
                        sessionStorage.setItem('ReloadingAfterPost',true)
                        window.location.reload()
                    } else {
                        alert('Failed to post answer');
                    };
                })
        
        })
        }
        
        else {
            alert("Please Enter a Question")
        }
    }
    render() {
        return (
            <Modal
                show={this.state.showModal1}
                onHide={this.props.close ? this.props.close : this.close}
                backdrop={true}
                backdropClassName="backdrop-style"
                dialogClassName="modal-style"
                aria-labelledby="modal-label"
            >
                <Modal.Header closeButton={true}>
                    <h4 id="modal-label" className="overlay-title">Answer Question</h4>
                </Modal.Header>
                <Modal.Body>
                    {this.state.content}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' onClick={this.postAnswer}> Submit
                    </Button><br></br>
                    <Button variant='secondary' onClick={this.props.close ? this.props.close : this.close}> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default AnswerQuestionsModal;

