import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BookShow from './book_show';
import { requestComment } from '../../actions/book_actions';



const mapStateToProps = (state, ownProps) => {
    return {
        book: state.books[ownProps.match.params.id],
        currentUser: state.session.currentUser,
        comment:state.books.comment,
    };
};

const mapDispatchToProps = dispatch => ({
    requestComment: (book_id) => dispatch(requestComment(book_id)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BookShow));
