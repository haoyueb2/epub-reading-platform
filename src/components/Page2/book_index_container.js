import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BookIndex from './index';
import { requestBookIndex } from '../../actions/book_actions';
import { selectAllBooks } from '../../reducers/selectors';

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
