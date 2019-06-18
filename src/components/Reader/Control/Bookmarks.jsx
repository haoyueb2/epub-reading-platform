import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Drawer from 'material-ui/Drawer';
import BookmarkItem from './Bookmark';
import Button from 'material-ui/Button'
const styles = theme => ({
  title: {
    marginTop: 10,
  },
  list: {
    width: 280,
    padding: 0,
    listStyle: 'none',
    overflowX: 'hidden',
  },
  foot: {
    display: 'flex',
    flexShrink: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 40,
    padding: '0 10px',
  },
});

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true};
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.toggleBookmarks(false);
  }

  render() {
    const classes = this.props.classes;

    return (
      <div id="bookmarks" >
        <Drawer open={this.props.open} onRequestClose={this.handleClose} >
          <div className={classes.foot}>

            <Button onClick={this.handleClose}  color="accent" dense>
              关闭
            </Button>
          </div>
          <div className={classes.title}>
            <Typography type="headline" align="center" gutterBottom>书签</Typography>
          </div>
          <ul className={classes.list}>
            {
              this.props.bookmarks.map(item => {
                return (
                  <BookmarkItem
                    key={item.key}
                    item={item}
                    epub={this.props.epub}
                    handleClose={this.handleClose}
                    updateBookmark={this.props.updateBookmark}
                    deleteBookmark={this.props.deleteBookmark}
                  />
                );
              })
            }
          </ul>

        </Drawer>
      </div>
    );
  }
}

Bookmarks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bookmarks);
