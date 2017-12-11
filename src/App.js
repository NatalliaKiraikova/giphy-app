import React, {Component} from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';

import SearchPage  from "./pages/SearchPage";
import RandomGifPage from "./pages/RandomGifPage";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <div>
                                <Link className="Router-link" to="/search-page">Search Gif</Link>
                                <Link className="Router-link" to="/show-random-gif">Show Random Gif</Link>
                            </div>
                        </div>


                        <Route path="/search-page" component={SearchPage}/>
                        <Route path="/show-random-gif" component={RandomGifPage}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
