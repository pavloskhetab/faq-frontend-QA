import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from './Components/FAQMainPage'


class App extends React.Component {
    render() {
        return (
            <div>

                <div>
                    <Router>
                        <div>
                            <Route exact path="/" component={MainPage} />
                        </div>
                    </Router>
                </div>
            </div>
            
        )
    }
}
export default App;
