/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';

import Content0 from './Content0';
import Content7 from './Content7';

import {
  Content00DataSource,
  Content70DataSource,
} from './data.source.js';

import './less/antMotionStyle.less';



export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const children = [
      <Content0
        id="Content0_0"
        key="Content0_0"
        dataSource={Content00DataSource}
      />,
      <Content7
        id="Content7_0"
        key="Content7_0"
        dataSource={Content70DataSource}
      />,
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
