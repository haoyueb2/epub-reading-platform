import React from 'react';
import {withRouter} from "react-router";
import Animation from "./animation"
import { Link } from 'react-router-dom';
//import 'antd/dist/antd.css';
import { Button} from 'antd';
import './book_show.css'
import {receiveCurrentUser} from "../../actions/session_actions";
class BookShow extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            bookID: this.props.match.params.id,
        };
    }
    componentDidMount() {
       // this.props.requestBook(this.props.match.params.id);
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
                    <div className="button">

                        <Button className="button" type="primary"  size="large" onClick={e=>this.addToShelf()}>
                            加入书架
                        </Button>

                    </div>
                    <section className="book-show">
                        <section className='book-info'>
                            <p className='title'>{book.title}</p>
                            <p className='author'>By: {book.author}</p>
                            <p className='description'>{book.description}</p>
                            <p className='pages'>Pages: {book.pages}</p>
                            <p className='publisher'>Publisher: {book.publisher}</p>
                            <p className='Rating'>Rating: {book.rating}</p>

                        </section>
                    </section>
                </div>
            );

        } else {
            return null;
        }
    }
}
export default withRouter(BookShow);