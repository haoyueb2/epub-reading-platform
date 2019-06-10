import React from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';




class BookGallery extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        if (this.props.books) {
            let allbooks = this.props.books.map( (book, index) =>  {
                var id = book.book_id || book.id;
                return (

                    <div className='div-book' key= {(index)}>
                        <Link to={`/page2/${id}`}>
                            <img className='front-image' src={book.cover_image_url} alt={book.title} />
                        </Link>
                    </div>

                );
            });
            //if(this.props.isMobile)
            return (
                <div className='index-main'>
                <div className='book-index-div'>
                    <div className='book-index-lower-div'>

                        { allbooks }
                    </div>

                </div>
                </div>
            );
        }
    }
}

export default withRouter(BookGallery);
