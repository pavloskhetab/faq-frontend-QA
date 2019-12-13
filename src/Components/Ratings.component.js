import React from 'react';
import { Button } from 'react-bootstrap';
import './css/FAQ.css'

export default class Ratings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rating: []};
    }

    componentDidMount() {
        fetch('http://localhost:9001/Answers/TotalRatings/${id}')
        .then(data => data.json())
        .then((data))
    }
    render() {
        return(
            <div>
                data.map
            </div>
        )
    }

}