import React from 'react';
import {withRouter} from "react-router";
import Animation from "./animation"
import { Descriptions, Badge,Tooltip,List,Comment,Form,Input} from 'antd';
//import 'antd/dist/antd.css';
import { Button} from 'antd';
import './book_show.css'
import {receiveCurrentUser} from "../../actions/session_actions";
const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </div>
);
class BookShow extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            bookID: this.props.match.params.id,
        };
    }
    componentDidMount() {
       this.props.requestComment(this.props.match.params.id);
    }
    addToShelf() {
        if(this.props.currentUser === null) {
            console.log("无用户")
        } else {
            let bookshelf_item = {
                user_id:this.props.currentUser.id,
                book_id:this.props.book.id,
            }
            fetch( "/api/bookshelf", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: 'POST',
                body: JSON.stringify(bookshelf_item)
            }).then(res=>res.text()).then(text=>console.log(text));
        }

    }
    //Animation/

    render() {
        const bookId = this.props.match.params.id;

        if (this.props.book) {
            let book = this.props.book;
            return (
                <div>
                    <Animation book ={this.props.book}/>

                    <div className="book-show">
                        <Button  type="primary"  size="large" onClick={e=>this.addToShelf()}>
                            加入书架
                        </Button>
                    <Descriptions title="书籍信息" bordered  >
                        <Descriptions.Item label="标题">{book.title}</Descriptions.Item>
                        <Descriptions.Item label="作者">{book.author}</Descriptions.Item>
                        <Descriptions.Item label="页数">{book.pages}</Descriptions.Item>
                        <Descriptions.Item label="出版社">{book.publisher}</Descriptions.Item>
                        <Descriptions.Item label="评分" span={1}>
                            {book.rating}
                        </Descriptions.Item>
                        <Descriptions.Item label="状态" span={3}>
                            <Badge status="processing" text="有epub资源" />
                        </Descriptions.Item>
                        <Descriptions.Item label="简介">
                            {book.description}
                            <br />

                        </Descriptions.Item>
                    </Descriptions>
                        <List
                            className="comment-list"
                            header="评论区:"
                            itemLayout="horizontal"
                            dataSource={this.props.comment}
                            renderItem={item => (
                                <li>
                                    <Comment

                                        author={item.username}
                                        avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        content={item.comment}
                                    />
                                </li>
                            )}
                        />
                        <Editor/>
                    </div>

                </div>
            );

        } else {
            return null;
        }
    }
}
export default withRouter(BookShow);