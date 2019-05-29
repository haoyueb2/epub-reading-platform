import React from 'react';
import {withRouter} from 'react-router';
import SessionFormContainer from './session_form_container';
import './index.css'
class Session extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedIn) {
            this.props.history.push('/books');
        }
    }

    top() {
        return(
            <section className='sign-up-container'>
                <SessionFormContainer />
            </section>
        );

    }
    //this.props.loggedIn === false
    render() {
        if (1) {
            return (
                <div className='landing-page'>
                    { this.top() }
                </div>

            );
        } else {
            return null;
        }
    }
}

export default withRouter(Session);
