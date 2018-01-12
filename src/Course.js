import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row} from 'antd';

class Course extends React.Component {

    createCourse = (e) => {
        this.setState({
            dataVisible: true
        })
    }

    applySubject = (e) => {
        this.setState({
            dataVisible: true
        })
    }

    //切换我的实验课和所有课程
    onCourseTypeClick(type) {
        let obj = this;
        this.setState({
            courseType: type,
            tableLoading: true
        }, function () {

        });
    }

    render() {
        return (
            <div className="gutter-example">
                <div>
                    <Row>
                        <a className="header-tab header-tab-border" href="#"
                           onClick={this.onCourseTypeClick.bind(this, 1)}>
                            我的实验课</a>
                        <a className="header-tab " href="#"
                           onClick={this.onCourseTypeClick.bind(this, 2)}>
                            所有课程</a>
                        <Button type="primary" style={{position: "relative", left: "700px"}}
                                onClick={this.createCourse}>创建实验课</Button>
                        <Button type="default" style={{position: "relative", left: "720px"}}
                            onClick={this.applySubject}>申请课程</Button>
                    </Row>
                </div>

                <div>
                    <a style={{left: "40px"}}>许建龙老师，你好！目前你一共有8门实验课。</a>
                </div >
                <div style={{background: '#ECECEC', padding: '30px',height: '500px' }}>
                    <Row gutter={6}>
                        <Col span={6}>
                            <Card style={{
                                width: "200px",
                                height: "180px",
                                position: "relative",
                                left: "20px"
                            }}>
                                <p>C语言实验课</p>
                                <p>共101位学生</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{width: "200px", height: "180px"}}>
                                <p>C语言实验课</p>
                                <p>共101位学生</p>

                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{width: "200px", height: "180px"}}>
                                <p>C语言实验课</p>
                                <p>共101位学生</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{width: "200px", height: "180px"}}>
                                <p>C语言实验课</p>
                                <p>共101位学生</p>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Course;
