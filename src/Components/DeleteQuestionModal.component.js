import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './css/FAQ.css'

class DeleteQuestionModal extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showModalq: this.props.showModalq,
            title: this.props.title
        };
        this.close = () => {
            this.setState({ showModalq: this.props.showModalq });
        };

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModalq: nextProps.showModalq
        })
    }
    

    /**
     *  This allows a user to delete/remove a question they have previously submitted. This will also allow admins to remove other users question
     *
     * @memberof DeleteQuestionModal
     */
    removeQuestion() {
        var q_id = sessionStorage.getItem('q_id');
        fetch(`http://localhost:4001/Questions/DelQ/` + q_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Question Deleted');
                    window.location.reload();
                } else {
                    alert('Failed to delete answer');
                };
            })
    }

    
    /**
     * This render is the design of the confirmation Modal that appears on screen for users to confirm they wish to delete the question
     *
     * @returns
     * @memberof DeleteQuestionModal
     */
    render() {
        return (
            <Modal
                show={this.state.showModalq}
                onHide={this.props.close ? this.props.close : this.close}
                backdrop={true}
                backdropClassName="backdrop-style"
                dialogClassName="modal-style"
                aria-labelledby="modal-label"
            >
                <Modal.Header closeButton={true}>
                    <h4 id="modal-label" className="overlay-title">Delete Confirmation</h4>
                </Modal.Header>
                <Modal.Body>
                <h5 id="modal-label">This will permanently delete ALL answers and comments for this question, are you sure?</h5>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant='danger' onClick={this.removeQuestion}> Confirm
                    </Button><br></br>
                    <Button variant='secondary' onClick={this.props.close ? this.props.close : this.close}> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default DeleteQuestionModal;