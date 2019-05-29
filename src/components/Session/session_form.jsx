import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            username2:"",
            password2:"",
            errors: this.props.errors
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.guestSubmit = this.guestSubmit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }



    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.clearErrors();
        this.props.processForm(user)
            .then(() => { this.setState({ errors: this.props.errors }); });

    }
    handleRegister(e) {
        e.preventDefault();
        const user = {
            username:this.state.username2,
            password:this.state.password2,
        };
        this.props.clearErrors();
        this.props.processRegister(user)
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
            <div className="login-form">
                <h1 className='logo'><strong>登录</strong></h1>


                    <button className='guest-button'>{ this.guestlogin() }</button>
                    <Form onSubmit={this.handleSubmit} >
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
                            登录
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>

                <Form onSubmit={this.handleRegister} >
                    <Form.Item>
                        {getFieldDecorator('username2', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                onChange={this.update('username2')}
                                required
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password2', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                onChange={this.update('password2')}
                                required
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            注册
                        </Button>

                    </Form.Item>
                </Form>

            </div>
        );
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SessionForm);
export default withRouter(WrappedNormalLoginForm );
