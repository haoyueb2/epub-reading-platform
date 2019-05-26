import React from 'react';
import { withRouter, Link } from 'react-router-dom';
class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            errors: this.props.errors
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.guestSubmit = this.guestSubmit.bind(this);
    }



    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.clearErrors();
        this.props.processForm(user)
            .fail(() => { this.setState({ errors: this.props.errors }); });

    }

    componentWillReceiveProps() {
        if (this.props.errors.length < 1) {
            this.setState({ errors: []});
        }
    }

    guestSubmit(e) {
        e.preventDefault();
        this.props.processForm({
            username: "guest",
            password: "password"
        });
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }


    guestlogin() {
        if(this.props.loggedIn === false) {
            return (
                <form onSubmit={this.guestSubmit}>
                    <input type="submit" value="Guest" className='guest-sumbit' />
                </form>
            );
        }

    }
    render() {
        document.title = "Awesome Readers";
        return (
            <div className='nav-sign-in'>
                <h1 className='logo'>Awesome<strong>Readers</strong></h1>

                <form className='submit-form'onSubmit={this.handleSubmit}>
                    {this.state.errors[0]}

                    <input className='session-username' placeholder="Username"type="text"
                           value={this.state.username}
                           onChange={this.update('username')}
                           required/>
                    <input className='session-password' placeholder="Password" type="password"
                           value={this.state.password}
                           onChange={this.update('password')}
                           required/>
                    <button className='sign-in-button'>Login</button>
                </form>
                <button className='guest-button'>{ this.guestlogin() }</button>
                <span className='after-effect'></span>
            </div>
        );
    }
}

export default withRouter(SessionForm);
