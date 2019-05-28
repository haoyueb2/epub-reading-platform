import React from 'react';
import {withRouter} from "react-router";
import Animation from "./animation"
import { Link } from 'react-router-dom';
//import 'antd/dist/antd.css';
import { Button} from 'antd';
import './book_show.css'
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
    //Animation/
    render() {
        const bookId = this.props.match.params.id;

        if (this.props.book) {
            let book = this.props.book;
            return (
                <div>
                    <Animation book ={this.props.book}/>
                    <div className="button">
                    <Link to={`/page2/reader/`+this.props.book.title}>
                        <Button className="button" type="primary" size="large">
                            Forward
                        </Button>
                    </Link>
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