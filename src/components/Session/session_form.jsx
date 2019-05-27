import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
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
            .then(() => { this.setState({ errors: this.props.errors }); });

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
        //document.title = "Awesome Readers";
        const { getFieldDecorator } = this.props.form;
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
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                onChange={this.update('username')}
                                required
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                onChange={this.update('password')}
                                required
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SessionForm);
export default withRouter(WrappedNormalLoginForm );
