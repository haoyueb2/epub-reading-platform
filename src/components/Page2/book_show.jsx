import React from 'react';
import {withRouter} from "react-router";
import Animation from "./animation"
import { Link } from 'react-router-dom';
//import 'antd/dist/antd.css';
import { Button} from 'antd';
class BookShow extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            bookID: this.props.match.params.id,
        };
    }
    componentDidMount() {
        this.props.requestBook(this.props.match.params.id);
    }
    //Animation/
    render() {
        const bookId = this.props.match.params.id;

        if (this.props.book) {
            let book = this.props.book;
            return (
                <div>
                    <Animation id = {bookId}/>
                    <section className="book-show">
                        <img className='front-image-show' src={book.cover_image_url} alt={book.title} />
                        <section className='book-info'>
                            <h1 className='title'>{book.title}</h1>
                            <h2 className='author'>By: {book.author}</h2>
                            <p className='description'>{book.description}</p>
                            <h3 className='pages'>Pages: {book.pages}</h3>
                            <h3 className='publisher'>Publisher: {book.publisher}</h3>
                            <h3 className='Rating'>Rating: {book.rating}</h3>
                            <Link to={`/page2/reader/1`}>
                            <Button type="primary" size="large">
                                Forward
                            </Button>
                            </Link>
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