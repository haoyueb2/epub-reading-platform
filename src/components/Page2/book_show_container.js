import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import BookShow from './book_show';
import { requestBook } from '../../actions/book_actions';



const mapStateToProps = (state, ownProps) => {
    return {
        book: state.books[ownProps.match.params.id],
        currentUser: state.session.currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    requestBook: (id) => dispatch(requestBook(id)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(BookShow));
