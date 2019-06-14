import React from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router';
import { enquireScreen } from 'enquire-js';


let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
class BookGallery extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isMobile,
        };
    }
    componentDidMount() {
        // 适配手机屏幕;
        enquireScreen((b) => {
            this.setState({ isMobile: !!b });
        });
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
            if(this.state.isMobile)
            return (
                <div className='index-main'>
                <div className='book-index-div1'>
                    <div className='book-index-lower-div1'>

                        { allbooks }
                    </div>

                </div>
                </div>
            );
            //如果是PC端
            else
                return(
                    <div className='index-main'>
                        <div className='book-index-div'>
                            <div className='book-index-lower-div'>

                                { allbooks }
                            </div>

                        </div>
                    </div>
                )
        }
    }
}

export default withRouter(BookGallery);
