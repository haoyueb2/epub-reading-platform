import React, {createRef} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Typography from 'material-ui/Typography';
import './Navigation.css';
import { Menu, Dropdown,Icon} from "antd";
const styles = {
  button: {
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  list: {
    width: 280,
    flex: 'initial',
  },
  title: {
    marginTop: 15,
    marginBottom: 15,
  },
};


class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: true,isShow :false};

    this.chapterList = null; // 章节列表 DOM 元素

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleShow = this.handleShow.bind(this);
    // this.toc= null;
    // this.setTocRef = element => {
    //   this.toc = element;
    // };
    this.myRef = createRef();
    this.toc = null;
  }

  componentDidMount() {
    let epub = this.props.epub;
    epub.getToc().then((chapters) => {
      this.chapterList = this.getChapters(chapters, false);
      this.setState({
          tocList:this.chapterList,
      });
      this.bindEventForChapters();
    });

  }

  componentDidUpdate() {

      let toc = this.myRef.current;
      if(toc!=null) {
        this.toc = toc;
        // if (toc.firstElementChild !== this.chapterList) {
        //   toc.appendChild(this.chapterList);
        // }
      }
      if(this.toc != null && this.chapterList != null) {
        console.log("插入前");
        console.log(this.toc);
        this.toc.appendChild(this.chapterList);
        console.log("插入后");
        console.log(this.toc);
      }
      console.log(this.toc === this.myRef.current);
      console.log(this.chapterList);

  }


  // 生成章节列表 DOM 元素
  getChapters(chapters, collapse) {
    let ul = document.createElement('ul');
    ul.className = collapse ? 'chapter-list collapse' : 'chapter-list expand';

    chapters.forEach((item) => {
      let li = document.createElement('li');
      li.className = 'chapter-list-item';
      let str;
      str = `<div class="item-content">
                <i class="item-mark"></i>
                <a class="chapter-url" href="${item.href}">${item.label}</a>
             </div>`;
      li.innerHTML = str;
      ul.appendChild(li);

      // 若章节还有子章节，递归生成目录（默认目录折叠）
      if (item.subitems && item.subitems.length) {
        li.appendChild(this.getChapters(item.subitems, true));
      }
    });

    return ul;
  }

  // 为章节列表 DOM 绑定事件处理程序
  bindEventForChapters() {
    this.chapterList.addEventListener('click', (event) => {
      let target = event.target;
      if (target.nodeName.toLowerCase() !== 'a') return;
      let href = target.getAttribute('href');
      this.props.epub.goto(href);
      console.log('navigation render: ', this.props.epub.isRendered);
      event.preventDefault();
    });
  }

  // 打开章节列表
  handleOpen() {
    this.setState({open: true});

  }

  // 关闭章节列表
  handleClose() {
    this.setState({open: false});
  }
  handleShow(){
    this.setState({isShow:!this.state.isShow})
  }
  render() {
    const { theme, classes } = this.props;
    let fontColor = {
      color: theme ? '#000000de' : '#fff',
    };
    const menu = (
        <div id="navigation" >
          <IconButton onClick={this.handleShow} className={classes.button}>
            <MenuIcon/>
          </IconButton>
          <div
              className={ 'show'}
          >

            <div className={classes.title}>
              <Typography type="title" align="center">
                Table Of Contents
              </Typography>
            </div>
            <div ref={this.myRef} className={classes.list} style={fontColor}>
            </div>

          </div>
        </div>
    );
    return (
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            Hover me <Icon type="down" />
          </a>
        </Dropdown>
    );
  }
}


Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
