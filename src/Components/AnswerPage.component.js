import React from 'react';
import { Button } from 'react-bootstrap';
import './css/FAQ.css'
import AnswerQuestionsModal from './AnswerModal.component'
import CommentModal from './CommentModal.component'
import DeleteAnswerModal from './DeleteAnswerModal.component'
import DeleteCommentModal from './DeleteCommentModal.component'
import { TextArea } from 'semantic-ui-react'


/**
 * Class that handles the functions and the rendering 
 * for the answer page
 *
 * @export
 * @class Answer
 * @extends {React.Component}
 */
export default class Answer extends React.Component {

    constructor() {
        super();
       
        this.state = {
            RecentA: [],
            RecentC: [],
            CountA: 0,
            QuestionRating: 0,
            showIssueModal: true
        }

    }
    /**
    * This is a function that is called when the add answer button is clicked.
    * It stores the answer id in the sessionStorage and then calls another function
    * called handleButtonToggleCommentModal
    *
    * @param {*} a_id
    * @memberof Answer
    */
    answerStorage(a_id) {
        sessionStorage.setItem('a_id', a_id)
        this.handleButtonToggleCommentModal(true)
    }


    /**
    * This is the function responsible for showing the modal
    * once the add comment button is clicked
    *
    * @memberof Answer
    */

    handleButtonToggleCommentModal = (toggle) => {
        this.setState({
            showModal: toggle
        });
    }
    /**
    * This is the function responsible for showing the modal
    * once the add answer button is clicked
    *
    * @memberof Answer
    */
    handleButtonToggleAnswerModal = (toggle) => {
        this.setState({
            showModal1: toggle
        });
    }

    /**
    * This is the function responsible for showing the model
    * once the delete answer button is clicked
    *
    * @memberof Answer
    */
    handleButtonToggleDeleteAnswerModal = (toggle, a_id) => {
        this.setState({
            showModal2: toggle
        });
        var a_id = sessionStorage.setItem('a_id', a_id);
    }

    /**
     * This is the function responsible for showing the model
     * once the delete answer button is clicked
     *
     * @memberof Answer
     */
    handleButtonToggleDeleteCommentModal = (toggle, c_id) => {
        this.setState({
            showModal3: toggle
        });
        var c_id = sessionStorage.setItem('c_id', c_id);
    }
    /**
    *This is the function responsible for the text area that is typed in
    *when you want to post an answer. We would use getElementByID("textAnswer")
    *
    * @memberof Answer
    */
    textAnswer = () => {
        return (
            <TextArea style={{ maxWidth: '100%', minWidth: '100%' }} id="textAnswer" />
        );
    }

    /**
     * This is the fucntion responsible for the text area that is typed in
     * when you want to post a comment. We would use getElementByID("textComment")
     *
     * @memberof Answer
     */
    textComment = () => {
        return (
            <TextArea style={{ maxWidth: '100%', minWidth: '100%' }} id="textComment" />
        );
    }


    /**
     * this function removes the paramter that would reload the same page again.
     * it also stores the q_id in the session to allow the mainpage to check if its the same q_id being pressed twice in a row.
     * the above is used as part of the upvote/downvote limit function.
     */
    HomePage = () => {
        sessionStorage.setItem('q_id', sessionStorage.getItem('q_id'))
        sessionStorage.removeItem('ReloadingAfterPost')
    }


    /**
     * This is a functoin that is called when the edit button that is next to
     * the answers is clicked. 
     * It communicates with the backednd through a fetch request to /Answers
     * /UpdateA.
     * It will then redirect you back to the answers page once this has been
     * submitted through a window.location.replace
     *
     *
     * @memberof Answer
     */

    editAnswer = (spanid, answer) => {

        var ref = document.getElementById("answer" + spanid)
        ref.innerHTML = ""
        var refTextInput = document.createElement("TextArea");
        var refConfirmButton = document.createElement("input");
        refConfirmButton.type = "Button"
        refConfirmButton.value = "Confirm"
        refConfirmButton.className = "EditConfirm"
        refConfirmButton.addEventListener("click", function () {
            let data = {
                "a_id": spanid,
                "updA": refTextInput.value
            }
            fetch(`http://localhost:4001/Answers/UpdateA`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            sessionStorage.setItem('ReloadingAfterPost',true)
        window.location.reload()
       
        })
        refTextInput.style.minWidth = "60%"
        refTextInput.style.maxWidth = "60%"
        refTextInput.style.marginLeft = "20px"
        refTextInput.value = answer
        ref.appendChild(refTextInput)
        ref.appendChild(refConfirmButton)
    }
    
    /**
     * This is a function that is responsible for 'up-voting' and 'down-voting'
     * question ratings
     * Firstly it will fetch the current question rating from database with q_id.
     * it will check to see if this question was the last to be upvoted/downvoted and will check what the original rating was
     * if the current rating is equal to the original rating it will allow an upvote/downvote.
     * If the up-vote button is clicked, then it +1 to the current rating.
     * If the down-vote button is clicked, then it -1 to the current rating.
     * It then updates this is the backend through a PUT request.
     *
     * @memberof Answer
     */
    
    editQuestionRating = async (id) => {

            let originalRating = sessionStorage.getItem('orgRating')  
                  
            let upBut = document.getElementById('upVoteQ')
            let downBut = document.getElementById('dwnVoteQ')
            let currentRating = ""
        let q_id = sessionStorage.getItem('q_id')
        await fetch(`http://localhost:9001/Questions/TotalRatings/${q_id}`)                                  //Url from backend
            .then(response => response.json())
            .then(dataTop => {
                currentRating = dataTop
                
            })
            if(id==="UP" && sessionStorage.getItem('PreviousVoteQ')==="UP" && currentRating > originalRating ){
                
                upBut.disabled = true
            }
            else if (id==="DOWN" && sessionStorage.getItem('PreviousVoteQ')==="DOWN" && currentRating < originalRating  ){
              
                downBut.disabled = true
            }

            else {
                

        if (id === "UP") { currentRating = currentRating + 1 }
        else if (id === "DOWN") { currentRating = currentRating - 1 }

        let updateRating = {
            "rating": currentRating,
            "q_id": q_id,
            "u_id": 24
        }
        await fetch(`http://localhost:9001/Questions/EditQuestionRating`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateRating)
        })
        window.location.reload()
        }
        
        
        sessionStorage.setItem('PreviousVoteQ',id)
        sessionStorage.setItem('ReloadingAfterPost',true)
       
       


    }

    /**
     * This is a function that is responsible for 'up-voting' and 'down-voting'
     * answer ratings.
     * Firstly it will check to see if the previous button press and a_id match, if so it will alert the user
     * if the above is not true it will fetch the current answer rating from database with q_id.
     * If the up-vote button is clicked, then it +1 to the current rating.
     * If the down-vote button is clicked, then it -1 to the current rating.
     * It then updates this is the backend through a PUT request.
     *  ERROR - can only press the buttons once at a time rather than checking the rating so doesnt work fully.
     *
     * @memberof Answer
     */
                  
    editAnswerRating = async (vote, a_id) => {
        if(vote==="UP" && sessionStorage.getItem('PreviousVoteA')==="UP" && a_id===parseInt(sessionStorage.getItem('PrevA_id'))){
            alert("You have already upvoted this answer")
        }
        else if (vote==="DOWN" && sessionStorage.getItem('PreviousVoteA')==="DOWN" && a_id===parseInt(sessionStorage.getItem('PrevA_id'))){
            alert("You have already downvoted this answer")
        }
        else {
            
            let currentRating = ""
            await fetch(`http://localhost:9001/Answers/TotalRatings/${a_id}`)                                  //Url from backend
                .then(response => response.json())
                .then(dataTop => {
    
                    currentRating = dataTop
                })
    
            if (vote === "UP") { currentRating = currentRating + 1 }
            else if (vote === "DOWN") { currentRating = currentRating - 1 }
    
            var updateRating = {
                "rating": currentRating,
                "a_id": a_id,
                "u_id": 24
            }
            await fetch(`http://localhost:9001/Answers/EditAnswerRating`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateRating)
            })
            window.location.reload()
        }
        sessionStorage.setItem('PrevA_id',a_id)
        sessionStorage.setItem('PreviousVoteA',vote)
        sessionStorage.setItem('ReloadingAfterPost',true)

       
    }

    

        
    
        
    /**
     * This is a function that is called when the edit button that is next to
     * the comments is clicked. 
     * It communicates with the backednd through a fetch request to /Comments
     * /UpdateC.
     * It will then redirect you back to the answers page once this has been
     * submitted through a window.location.replace
     * 
     *
     * @memberof Answer
     */
        

    editComment = (spanid, comment) => {

        var ref = document.getElementById("comment" + spanid)
        ref.innerHTML = ""
        var refTextInput = document.createElement("TextArea");
        var refConfirmButton = document.createElement("input");
        refConfirmButton.type = "Button"
        refConfirmButton.value = "Confirm"
        refConfirmButton.className = "EditConfirm"
        refConfirmButton.addEventListener("click", function () {
            let data = {
                "c_id": spanid,
                "updC": refTextInput.value
            }
            fetch(`http://localhost:4001/Comments/UpdateC`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            sessionStorage.setItem('ReloadingAfterPost',true)
            window.location.reload()
           
        })
        refTextInput.style.minWidth = "50%"
        refTextInput.style.maxWidth = "50%"
        refTextInput.style.marginLeft = "60px"
        refTextInput.innerHTML = comment 
        ref.appendChild(refTextInput)
        ref.appendChild(refConfirmButton)
    }

    /**
     * the commented out finction below works and was responsible for combining an array with results from a query in node
     * with an array created by the merging of several springboot requests.
     * it works however it is too slow for the render and so can be very buggy.
     * this was all to get the ratings for each particular answers from springboot
     * we have used node instead due to time constraints.
     */

    // combineArray = (RecentA, Ratings) => {
    //     console.log(Ratings)
    //     console.log(Ratings[0])
    //     var newArray = []
    //         newArray = RecentA.map((data, index) => {
    //             return (
    //                 {
    //                     "a_id": data.a_id,
    //                     "answer": data.answer,
    //                     "niceDate": data.niceDate,
    //                     "niceTime": data.niceTime,
    //                     "postdate_A": data.postdate_A,
    //                     "q_id": data.q_id,
    //                     "u_id": data.u_id,
    //                     "rating": Ratings[index]
    //                 }
    //             )
    //         })
        
                   
    //     return (newArray)
    // }


    /**
     * This componentDidMount function is responsible for processing
     * all of the get requests relating to answers to the backend.
     * They display the recent answers answers as well as those
     * /Answers/CountA tells you how many answers there are.
     * /Comments/GetC gets all the comments relating to the specific
     * answer from the back-end.
     * it will also check if there are any answers and if there are none it will nto attempt to grab comments
     * there are elements commented out relating to the above function which take the springboot requests and put then into an array to send to the above function
     * 
     *
     * @memberof Answer
     */
    

    componentDidMount = async () => {
        let prevLod = sessionStorage.getItem('prevLod')
        let Alpha = ""
        let Beta = ""
        let Gamma = ""
        let totalRatingQ = ""
        
        var Ratings = []
        // var urlString = window.location.href
        // var url = new URL(urlString)
        // var q_id =  url.searchParams.get("q");
        var q_id = sessionStorage.getItem('q_id')
       await fetch(`http://localhost:4001/Answers/RecentA/${q_id}`)
            .then(response => response.json())
            .then(dataRecentA => {
                Alpha=dataRecentA
            //     if(dataRecentA.length>0){

            //         dataRecentA.forEach(element => {
            //         fetch(`http://localhost:9001/Answers/TotalRatings/${element.a_id}`)
            //             .then(response => response.json())
            //             .then(data => {
            //                 Ratings.push(data) 
            //                 Alpha = this.combineArray(dataRecentA,Ratings)   
            //             })
            //     })
            // }
            //     else{Alpha=dataRecentA}  
            })
        await fetch(`http://localhost:9001/Questions/TotalRatings/${q_id}`)
            .then(response => response.json())
            .then(data => {

                if(prevLod != 1){
                    sessionStorage.setItem('orgRating',data)
                }

                if (data > 0) { data = "+" + data }

                totalRatingQ = data
              
            })

        await fetch(`http://localhost:4001/Answers/CountA/${q_id}`)
            //Url from backend
            .then(response => response.json())
            .then(data => {
                Beta = data[0].hits
                sessionStorage.setItem('prevLod',1)
            })
        if (Beta > 0) {
            fetch(`http://localhost:4001/Comments/GetC/${q_id}`)
                .then(response => response.json())
                .then(dataC => {
                    Gamma = dataC
                    this.setState({
                        RecentC: dataC,
                        RecentA: Alpha,
                        CountA: Beta,
                        QuestionRating: totalRatingQ,
                    })
                })
        }
        else {
            this.setState({
                RecentC: Gamma,
                RecentA: Alpha,
                CountA: 0,
                QuestionRating: totalRatingQ,
            })
            
        }
        
    }

    render() {
        return (
            <div>
                <body id="page-top">
                    <nav class="navbar navbar-expand-lg fixed-top" id="mainNav" className='FAQHeader'>
                        <div class="container">
                            <a class="navbar-brand js-scroll-trigger" href="/" onClick={this.HomePage}><img
                                src="Nationwide.png"
                                width="50"
                                height="50"
                                alt="Nationwide Logo"
                                style={{ borderRadius: '25px' }} /></a>
                            <Button variant='danger' onClick={() => this.handleButtonToggleAnswerModal(true)} style={{ height: '25px', paddingTop: '0' }}>Answer Question</Button>
                            <AnswerQuestionsModal content={this.textAnswer()} title={"Answer Question"} showModal1={this.state.showModal1} close={() => this.handleButtonToggleAnswerModal(false)} />
                            <div class="collapse navbar-collapse" id="navbarResponsive">
                            </div>
                        </div>
                    </nav>
                </body>
                <br />
                <h3 className='QuestionSubheading'>Question:
                </h3>
                <h4 className='QuestionHeading'> {sessionStorage.getItem('questions')}<Button variant='primary' id="upVoteQ" onClick={() => this.editQuestionRating("UP")} className='VoteUp'><i style={{ marginBottom: '3px' }} class="arrow up"></i></Button>
                    <Button variant='danger' id="dwnVoteQ" onClick={() => this.editQuestionRating("DOWN")} className='VoteDown'><i style={{ marginBottom: '7px' }} class="arrow down"></i></Button>

                    (rating: {this.state.QuestionRating})<br /></h4>

                <text variant='secondary' style={{ marginLeft: '40px' }}>posted on: {sessionStorage.getItem('postDQ')} @ {sessionStorage.getItem('postTQ')}</text>
                <div class="container site-container" style={{ marginTop: '20px', marginBottom: '30px' }}>
                    <div class="row">
                        <div class="col-lg-12">
                            <h4 className='AnswersSubheading'>Answers ({this.state.CountA}): </h4><br />
                            <div className='Separator'>
                                <hr />
                            </div>
                            {
                                this.state.RecentA.map((data) =>
                                    <div>
                                        <span id={'answer' + data.a_id}> <text className='EditAnswerText'>{data.answer}</text></span>< br />
                                        <span>posted on: {data.niceDate} @ {data.niceTime}</span>

                                        <font className='hyperlinkText' onClick={() => this.editAnswer(data.a_id, data.answer)} style={{ marginLeft: '20px', color:'red' }}>Edit</font>
                                        <font className='hyperlinkText' onClick={() => this.handleButtonToggleDeleteAnswerModal(true, data.a_id)} style={{ marginLeft: '20px', marginRight: '20px', color:'red' }}>Delete</font>
                                        <br /><br />
                                        <Button variant='primary' onClick={() => this.editAnswerRating("UP", data.a_id)} className='VoteUp'><i style={{ marginBottom: '3px' }} class="arrow up"></i></Button>
                                        <Button variant='danger' onClick={() => this.editAnswerRating("DOWN", data.a_id)} className='VoteDown'><i style={{ marginBottom: '7px' }} class="arrow down"></i></Button>
                                        (rating: {data.rating})
                                        <Button variant='primary' size='sm' onClick={() => this.answerStorage(data.a_id)} className='CommentButton'>Add Comment</Button><br /><br />
                                        <hr className='AnswerCommentSeparator' />
                                        <br />
                                        {
                                            this.state.RecentC.map((RecentC) => {
                                                if (data.a_id === RecentC.a_id) {


                                                    var element = <div><span id={'comment' + RecentC.c_id}><textarea rows='3' className='CommentBox' disabled>{RecentC.comment}</textarea></span><br />


                                                        <span style={{ marginLeft: '55px' }}>posted on: {RecentC.niceDate}</span><br />
                                                        <span style={{ marginLeft: '55px' }}>@ {RecentC.niceTime}</span>
                                                        <font className='hyperlinkText' onClick={() => this.editComment(RecentC.c_id, RecentC.comment)} style={{ marginLeft: '20px', color:'red' }}>Edit</font>
                                                        <font className='hyperlinkText' onClick={() => this.handleButtonToggleDeleteCommentModal(true, RecentC.c_id)} style={{ marginLeft: '20px', marginRight: '20px', color:'red' }}>Delete</font>
                                                        <br /><br /><br />

                                                    </div>

                                                }
                                                return (
                                                    <div>
                                                        {element}
                                                    </div>

                                                )
                                            }
                                            )
                                        }
                                        <br /><br />
                                        <hr className='Separator' />

                                    </div>
                                )}
                        </div>
                    </div>
                </div>
                <DeleteAnswerModal title={"Delete Confirmation"} showModal2={this.state.showModal2} close={() => this.handleButtonToggleDeleteAnswerModal(false)} />
                <DeleteCommentModal title={"Delete Confirmation"} showModal3={this.state.showModal3} close={() => this.handleButtonToggleDeleteCommentModal(false)} />
                <CommentModal content={this.textComment()} title={"Add A Comment"} showModal={this.state.showModal} close={() => this.handleButtonToggleCommentModal(false)} />
                <footer class="py-1 sticky-bottom footer" className='FAQFooter'>
                    <div class="container">
                        <p class="m-0 text-center text-black">Copyright &copy; APT 2019</p>
                    </div>
                </footer>
            </div>
        )
    }
}