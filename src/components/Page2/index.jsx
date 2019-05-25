import React from 'react';
import {withRouter} from 'react-router';

import BookGallery from './book_gallery';
import "./index.scss"

class BookIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestBookIndex();
    }


    render() {
        return <BookGallery books={this.props.books} />;
    }
}

export default withRouter(BookIndex);
