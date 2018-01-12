import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row} from 'antd';

class Authority extends React.Component {

    render() {
        return (
            <div className="gutter-example">
            <div>
                <a>HELLO WORLD</a>
                <h1>HELLO WORLD</h1>
                <p>HELLO WORLD</p>
            </div>

                <div>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Card title="C语言" extra={<a href="#">修改</a>}
                                  style={{width: 250, height: 220, position: "relative", left: 20}}>
                                这是简介
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Authority;
