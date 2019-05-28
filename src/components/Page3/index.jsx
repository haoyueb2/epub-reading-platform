/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';


export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const children = [
      <h1> none
      </h1>
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
