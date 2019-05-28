/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import{List} from'antd';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }
  //只在本组件用不再使用redux
  componentWillMount() {
    if(this.props.currentUser != null) {
      fetch("api/bookshelf/" + this.props.currentUser.id).then(res=>res.json()).then(
          json=>{
              console.log(json);
              let myBookShelf=[];
              if(this.props.books!=null)
              for(let tmp of json) {
                  myBookShelf.push(this.props.books[tmp.book_id]);
              }
              console.log(myBookShelf);
            this.setState({
              data: myBookShelf,
            });
          }
      )
    }
  }


  render() {
    const children = [
      <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.data}
          footer={< div > <b>我的</b> 书架</div >}
          renderItem={
            item => (
                <List.Item
                    key={item.title}
                    actions={[<p>{item.description}</p>]}
                    extra={<img width={100} alt="logo" src= {item.cover_image_url} />}
                >
                  <List.Item.Meta
                      //avatar={<Avatar shape = "square" size = {150} src={item.poster} width = {100} alt="logo"/>}
                      title={  item.title}
                      description={item.description}
                  />
                </List.Item>)}
      />
    ];
    return (
      <div
        className="templates-wrapper"
        ref={(d) => {
          this.dom = d;
        }}
      >

        {children}

      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    books:state.books,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Index));