import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import Header from './Home/Nav0';
import Footer from './Home/Footer0';
import Home from './Home';
import Page3 from './Page3';
import BookIndex from './Page2/book_index_container';
import Book from './Page2/book_show_container';
import {
    Nav00DataSource,
    Footer00DataSource,
} from './Home/data.source.js';

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMobile,
        };
    }
    componentDidMount() {
        // 适配手机屏幕;
        enquireScreen((b) => {
            this.setState({ isMobile: !!b });
        });
    }
    render() {
        return (

                <div>
                    <Header dataSource={Nav00DataSource} isMobile={this.isMobile} />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/page2" component={BookIndex} />
                    <Route exact path="/page2/:id" component={ Book }/>
                    <Route exact path="/page3" component={Page3} />
                    <Footer dataSource={Footer00DataSource} isMobile={this.isMobile} />
                </div>

        );
    }
}

export default App;