import React from 'react';
import {withRouter} from 'react-router';

import BookGallery from './book_gallery';
import "./index.scss"

import { connect } from 'react-redux';

import { requestBookIndex } from '../../actions/book_actions';
import { selectAllBooks } from '../../reducers/selectors';

class BookIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.requestBookIndex();
    }


    render() {
        return <BookGallery books={this.props.books}/>;
    }
}

const mapStateToProps = (state) => {
    return {
        //将对象转化为数组，方便后续使用map
        books: selectAllBooks(state.books),
    };
};

const mapDispatchToProps = dispatch => ({
    requestBookIndex: () => dispatch(requestBookIndex()),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BookIndex));