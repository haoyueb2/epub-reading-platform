import React, { Component } from 'react';
import { Route, Link ,withRouter} from "react-router-dom";
import { enquireScreen } from 'enquire-js';
import Header from './Home/Nav0';
import Footer from './Home/Footer0';
import Home from './Home';
import Page3 from './Page3';
import BookIndex from './Page2';
//import BookIndex from './Page2/book_index_container';
import Book from './Page2/book_show_container';
import SReader from './Reader/Control/App'
import Session from "./Session"
import Admin from "./Admin"
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
    controlHeader() {
        //console.log(this.props.history.location.pathname);
        if (this.props.history.location.pathname.indexOf('/reader') !== -1) return null;
        return <Header dataSource={Nav00DataSource} isMobile={this.state.isMobile} />;
    }
    controlFooter() {
        if (this.props.history.location.pathname.indexOf('/reader') !== -1) return null;
        return <Footer dataSource={Footer00DataSource} isMobile={this.state.isMobile} />;
    }
    render() {
        return (

                <div>

                    {this.controlHeader()}
                    <Route exact path="/" component={Home} />
                    <Route exact path="/page2" component={BookIndex}  />
                    <Route exact path="/page2/:id" component={ Book }/>
                    <Route exact path ="/admin" component={Admin}/>
                    <Route exact path="/page3" component={Page3} />
                    <Route exact path="/session" component={Session} />
                    <Route exact path="/reader/:id" component={SReader}/>
                    {this.controlFooter()}

                </div>

        );
    }
}

export default withRouter(App);