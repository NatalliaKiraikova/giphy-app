import React, {Component} from 'react';
import axios from 'axios';

import * as constants from "../../Constants.js";
import './SearchPage.css';

class SearchPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            result: [],
            query: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleQueryChange = this.handleQueryChange.bind(this);
        this.setFocus = this.setFocus.bind(this);
    }

    componentDidMount() {
        this.setFocus();
    }

    setFocus() {
        this.inputEl.focus();
    }

    handleSearch(event) {
        event.preventDefault();

        axios.get(constants.GIPHY_SEARCH_URL, {
            params: {api_key: constants.GIPHY_API_KEY, q: this.state.query}
        }).then(response => {
            this.setState({result: response.data.data});
        }).catch(error => {
            console.log(error);
        })
    }

    handleQueryChange(event) {
        this.setState({
            query: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h1>Search Gif Page</h1>

                <form onSubmit={this.handleSearch}>
                    <label htmlFor="gifQuery">Search</label>
                    <input id="gifQuery" type="text"
                           value={this.state.query}
                           onChange={this.handleQueryChange}
                           ref={(input) => {
                               this.inputEl = input;
                           }}
                    />
                </form>

                <ul>
                    {
                        this.state.result.map(item => {
                            return (
                                <li key={item.id}>
                                    <img src={item.images.preview_gif.url} alt={item.slug}/>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default SearchPage;