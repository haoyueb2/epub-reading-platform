/* eslint no-undef: 0 */
/* eslint arrow-parens: 0 */
import React from 'react';


import { Card, Col, Row } from 'antd';



export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const children = [
            <div style={{ background: '#ECECEC', padding: '40px' }}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card hoverable
                              style={{ width: 240 }}
                              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                            Card content
                        </Card>

                    </Col>
                    <Col span={8}>
                        <Card hoverable
                              style={{ width: 240 }}
                              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                            Card content
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable
                              style={{ width: 240 }}
                              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
                            Card content
                        </Card>
                    </Col>
                </Row>
            </div>
        ];
        return (
            <div
                className="templates-wrapper"
                ref={(d) => {
                    this.dom = d;
                }}
            >
                {/* 如果不是 dva 2.0 替换成 {children} start */}
                {children}
                {/* 如果不是 dva 2.0 替换成 {children} end */}
            </div>
        );
    }
}
