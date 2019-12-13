import React from 'react';
import { Form, Button } from 'react-bootstrap'
import './css/FAQ.css'
import AskQuestionModal from './AskQuestionModal.component'
import { TextArea } from 'semantic-ui-react'

export default class Home extends React.Component{

    constructor() {
        super();
        
    
        this.state = { 
            filteredResults:[],
            searchText: sessionStorage.getItem('SearchText')                                           
        }
        
        console.log(this.state.searchText)
    }

/**
 * this function is a duplicate of the one on the homepage which allows users to search again on the search page.
 */

    search = (e) => {
        e.preventDefault()
        var initialString = document.getElementById("searchText").value
        if(initialString.length>0){
            
        var queryString = initialString.replace(/[^a-zA-Z ]/g, "")
        sessionStorage.setItem('SearchText',queryString)
        fetch(`http://localhost:4001/Questions/SearchQ/${queryString}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    filteredResults: data
                })
            })
            sessionStorage.setItem('ReloadingAfterSearch',true)
        }
            else alert("Please enter search parameters")
    }   

    /**
     * this is also a duplicate of the homepage function.
     * @param {*} question 
     * @param {*} q_id 
     * @param {*} postDQ 
     * @param {*} postTQ 
     */

    Qstorage(question, q_id, postDQ, postTQ) {
        sessionStorage.setItem('questions', question)
        sessionStorage.setItem('q_id', q_id)
        sessionStorage.setItem('postDQ', postDQ)
        sessionStorage.setItem('postTQ', postTQ)
        sessionStorage.setItem('ReloadingAfterPost',true)
        window.location.reload()
       
    }


    /**
     * the below are all ducplicates of the mainpage functions to provide same functionality to this component.
     */
    callchange = (e) => {
        console.log(e.keyCode)
        if (e.keyCode === 13) {
            this.search(e)
        }
        //e.preventDefault()
    }
    handleButtonToggleAskModal = (toggle) => {

        this.setState({
            showModal: toggle
        });
    }
    textAnswer = () => {
        return (
            <TextArea id="textQuestion" style={{ maxWidth: '100%', minWidth: '100%' }} />

        );
    }
    HomePage = () => {
       
        sessionStorage.removeItem('ReloadingAfterSearch')
    }

    componentDidMount = () => {
        let queryString = sessionStorage.getItem('SearchText')
      fetch(`http://localhost:4001/Questions/SearchQ/${queryString}`)
        .then(response => {
            return response.json();
        }) 
        .then(data => {
            this.setState({
                filteredResults: data,
            })
        })

    }


    render(){
        if(this.state.filteredResults.length>0){
            return (
                <div>
                    <body id="page-top">
    
                        <nav class="navbar navbar-expand-lg fixed-top" id="mainNav" style={{ backgroundColor: '#DFDFDF', borderTop: '2px solid', borderBottom: '2px solid', color: 'black', paddingTop: '0px', paddingBottom: '0px' }}>
                            <div class="container">
                                <a class="navbar-brand js-scroll-trigger" href="/" onClick={this.HomePage}><img
                                    src="Nationwide.png"
                                    width="50"
                                    height="50"
                                    alt="Nationwide Logo"
                                    style={{ borderRadius: '25px' }} /></a>
                                 <div className='searchBar'> 
                                <Form inline>
                                    <input id="searchText" onKeyDown={this.callchange} spellcheck='true' size="sm" placeholder="Search..." className="mr-sm-1 searchBarText" />
                                <button className='searchButton' onClick={this.search}><img src="search.png" width='30px' height='30px'></img></button>
                                </Form>
                                </div>
                                <div class="collapse navbar-collapse" id="navbarResponsive">
    
                                </div>
                            </div>
                        </nav>
                    </body>
                    <br />
                    <div className="container" style={{ marginTop: '60px', marginBottom: '30px', height:'327px' }}>
                        <div class="row">
                            <div class="col-lg-8">
                                <h3 style={{ color: '#3252A4' }}>Search Results:</h3>
                                <p class="lead"></p>
                                {
                                    this.state.filteredResults.map((data, index) =>
    
                                        <div>
                                            <font className='hyperlinkText' style={{color:'#4385FC'}} onClick={() => this.Qstorage(data.question, data.q_id, data.niceDate, data.niceTime)}>{index + 1}) {data.question}</font><br />
                                            <br />
                                        </div>
                                    )}
                            </div>
                        </div>
    
    
                    </div>
                    <center>
                        <div>Not found what you were looking for?</div><br />
                        <Button variant='danger' onClick={() => this.handleButtonToggleAskModal(true)} style={{ height: '25px', paddingTop: '0' }}>Ask A Question</Button>
                    </center>
                    <AskQuestionModal content={this.textAnswer()} title={"Ask A Question"} showModal={this.state.showModal} close={() => this.handleButtonToggleAskModal(false)} /><br />
                    <footer className='py-1  FAQFooter'>
                        <div class="container">
                            <p class="m-0 text-center text-black">Copyright &copy; APT 2019</p>
                        </div>
                    </footer>
                </div>
            )
        }

        else {
            return (
                <div>
                    <body id="page-top">
    
                        <nav class="navbar navbar-expand-lg fixed-top" id="mainNav" style={{ backgroundColor: '#DFDFDF', borderTop: '2px solid', borderBottom: '2px solid', color: 'black', paddingTop: '0px', paddingBottom: '0px' }}>
                            <div class="container">
                                <a class="navbar-brand js-scroll-trigger" href="/" onClick={this.HomePage}><img
                                    src="Nationwide.png"
                                    width="50"
                                    height="50"
                                    alt="Nationwide Logo"
                                    style={{ borderRadius: '25px' }} /></a>
                                 <div className='searchBar'> 
                                <Form inline>
                                    <input id="searchText" onKeyDown={this.callchange} spellcheck='true' size="sm" placeholder="Search..." className="mr-sm-1 searchBarText" />
                                <button className='searchButton' onClick={this.search}><img src="search.png" width='30px' height='30px'></img></button>
                                </Form>
                                </div>
                                <div class="collapse navbar-collapse" id="navbarResponsive">
    
                                </div>
                            </div>
                        </nav>
                    </body>
                    <br />
                    <div className="container" style={{ marginTop: '60px', marginBottom: '30px', height:'327px' }}>
                        <div class="row">
                            <div class="col-lg-8">
                                <h3 style={{ color: '#3252A4' }}>Search Results:</h3>
           
                                <p class="lead"></p>
                               
                               
                            </div>
                        </div>
    
                        <h3 style={{ color: '#3252A4' }}>No results found for....</h3>
                        <h3 style={{ color: 'red' }}>"{sessionStorage.getItem('SearchText')}"</h3>
            
                    </div>
                    
                    <center>
                        <div>Not found what you were looking for?</div><br />
                        <Button variant='danger' onClick={() => this.handleButtonToggleAskModal(true)} style={{ height: '25px', paddingTop: '0' }}>Ask A Question</Button>
                    </center>
                    <AskQuestionModal content={this.textAnswer()} title={"Ask A Question"} showModal={this.state.showModal} close={() => this.handleButtonToggleAskModal(false)} /><br />
                    <footer className='py-1  FAQFooter'>
                        <div class="container">
                            <p class="m-0 text-center text-black">Copyright &copy; APT 2019</p>
                        </div>
                    </footer>
                </div>
            )
        }
       
    }

}
