import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import './css/FAQ.css'

class CommentModal extends Component {
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
     * @memberof CommentModal
     */
    componentWillReceiveProps(nextProps) {
        this.setState({
            showModal: nextProps.showModal
        })
    }
     /**
     * Function to post a comment to the database using 
     * /Comment/Post
     * Once the comment has been sent, it reloads the overall
     * answers page
     *
     * @memberof CommentModal
     */
    postComment = (e) =>{
        e.preventDefault();
        
        if(document.getElementById("textComment").value.length>1){
            sessionStorage.setItem('ReloadingAfterPost',true)
            this.setState({
                textComment:document.getElementById("textComment").value
            }, () => {
                let data = {
                    
                    "a_id": sessionStorage.getItem('a_id'),
                    "userID": 71,   
                    "comment":this.state.textComment                                                           
                }
                fetch(`http://localhost:4001/Comments/PostC`, {                                  
                    method: 'POST',                                                            
                    headers: {
                        'Content-Type': 'application/json',                                  
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {                                                    
                        if (response.status === 200) {
                            
                            window.location.reload()
                           
                        } else {
                            alert('Failed to post comment');
                        };
                    })
                    console.log(this.state.textComment)
            })
        }
       
        
        else alert("Please enter a comment")
    }


    /**
     *This render is the design of the Comment Modal that appears on screen to allow users to comment
     *
     * @returns
     * @memberof CommentModal
     */
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
                    <h4 id="modal-label" className="overlay-title">Add a Comment</h4>
                </Modal.Header>
                <Modal.Body>
                    {this.state.content}
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant='danger' onClick={this.postComment}> Submit
                    </Button><br></br>
                    <Button variant='secondary' onClick={this.props.close ? this.props.close : this.close}> Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default CommentModal;