import React, {Component} from 'react';
import axios from 'axios';

import * as constants from "../../Constants.js";

class RandomGifPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            result: [],
            timeSpan: 1000
        };

        this.handleTimeSpanChange = this.handleTimeSpanChange.bind(this);
        this.setFocus = this.setFocus.bind(this);
        this.restartTimer = this.restartTimer.bind(this);
    }

    handleTimeSpanChange(event) {
        this.setState({
            timeSpan: event.target.value
        })
    }

    restartTimer() {
        console.log('new value', this.state.timeSpan);
        if (this.timerId) {
            clearInterval(this.timerId);
        }
        this.timerId = setInterval(() => {
            this.updateGif();
        }, this.state.timeSpan);
    }

    updateGif() {
        axios.get(constants.GIPHY_RANDOM_URL, {
            params: {api_key: constants.GIPHY_API_KEY}
        }).then(response => {
            this.setState({result: response.data.data});
        }).catch(error => {
            console.log(error);
        })
    }

    componentDidMount() {
        this.setFocus();
        this.restartTimer();
    }

    setFocus() {
        this.inputEl.focus();
    }

    render() {
        return (
            <div>
                <h1>Random Gif Page</h1>

                <input id="timeSpan" type="number"
                       value={this.state.timeSpan}
                       onChange={this.handleTimeSpanChange}
                       ref={(input) => {
                           this.inputEl = input;
                       }}
                />

                <button type="button" onClick={this.restartTimer}>Click</button>
                <br/>
                <br/>
                <img src={this.state.result.image_url} alt={this.state.result.slug}/>
            </div>
        )
    }
}

export default RandomGifPage;