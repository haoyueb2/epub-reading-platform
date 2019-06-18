import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox ,Upload, message } from 'antd';
import "./index.css"
import {receiveErrors} from "../../actions/error_actions";
import {receiveCurrentUser} from "../../actions/session_actions";

const Search = Input.Search;
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            author:"",
            title:"",
            description:"",
            cover_img_url:"",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        const book = Object.assign({}, this.state);
        console.log(book);
        fetch( window.webBase+"api/upload", {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify(book)
        }).then(res=>res.json()).then(json => (console.log(json)
        ), err => (
           console.log(err)
        ))
    }
    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const props = {
            name: 'epub',
            action: window.webBase+"api/upload_epub",
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div className="admin-page">
            <div className="login-form">
                <h1 className='logo'><strong>上传书籍</strong></h1>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item>
                        {getFieldDecorator('author')(
                            <Input
                                type="author"
                                placeholder="author"
                                onChange={this.update('author')}
                                required
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('title')(
                            <Input
                                type="title"
                                placeholder="title"
                                onChange={this.update('title')}
                                required
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('description')(
                            <Input
                                type="description"
                                placeholder="description"
                                onChange={this.update('description')}
                                required
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('cover_img_uri')(
                            <Input
                                type="cover_img_url"
                                placeholder="封面图片的url地址"
                                onChange={this.update('cover_img_url')}
                                required
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            上传
                        </Button>
                    </Form.Item>
                </Form>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> 上传epub和svg图片,命名需和title一致
                    </Button>
                </Upload>
                <h1 className='logo'><strong>删除书籍</strong></h1>
                <Search placeholder="输入删除书籍的title"
                        enterButton="删除"
                        onSearch={(value) => {
                            fetch(window.webBase+"api/delete_book/"+value);
                        }}/>
            </div>
            </div>
        )
    }
}
const WrappedForm = Form.create({ name: 'upload' })(Index);
export  default  WrappedForm;