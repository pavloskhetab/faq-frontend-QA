import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './css/FAQ.css'

class DeleteCommentModal extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            showModal3: this.props.showModal3,
            title: this.props.title
        };
        this.close = () => {
            this.setState({ showModal3: this.props.showModal3 });
        };

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal3: nextProps.showModal3
        })
    }
   

    /**
     *
     * This allows a user to delete/remove a comment they have previously submitted. This will also allow admins to remove other users comments
     * @memberof DeleteCommentModal
     */
    removeComment() {
        var c_id = sessionStorage.getItem('c_id');
        fetch(`http://localhost:4001/Comments/DelC/` + c_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Comment Deleted');
                    sessionStorage.setItem('ReloadingAfterPost',true)
                    window.location.reload();
                } else {
                    alert('Failed to delete comment');
                };
            })
    }


    /**
     * This render is the design of the confirmation Modal that appears on screen for users to confirm they wish to delete the comment
     *
     * @returns
     * @memberof DeleteCommentModal
     */
    render() {
        return (
            <Modal
                show={this.state.showModal3}
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
                <h5 id="modal-label">This will permanently delete this comment, are you sure?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={this.removeComment}> Confirm
                    </Button><br></br>
                    <Button variant='secondary' onClick={this.props.close ? this.props.close : this.close}> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default DeleteCommentModal;