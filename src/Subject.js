import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
};
const minHeight = window.innerHeight ;
const modalWidth = 866;
const {Header, Content, Sider} = Layout;

class Subject extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            logined: true,
            dataVisible: false,
            userName: "陈瑶琪",
            userNum: "2014329620037",
            subjectId: "0001",
            subjectName: "C语言"
        }
    }

    createSubject = (e) => {
        this.setState({
            dataVisible: true
        })
    }


    handleCancel = (e) => {
        this.setState({
            dataVisible: false,
        });
    }


    //切换所有课程和待审批课程
    onSubjectTypeClick(type) {
        let obj = this;
        this.setState({
            subjectType: type,
            tableLoading: true
        }, function () {

        });


    }

    render() {
        return (
            <div className="gutter-example">
                <div className="header-tab header-tab-border">
                    <a href="#" onClick={this.onSubjectTypeClick.bind(this, 1)}> 所有课程</a>
                    <a href="#" onClick={this.onSubjectTypeClick.bind(this, 2)}> 待审批课程</a>
                    <Button type="primary" style={{position: "relative", left: 888}}
                            onClick={this.createSubject}>创建课程</Button>
                </div>


                <div>
                    <br></br>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Card title="C语言" extra={<a href="#">修改</a>}
                                  style={{width: 250, height: 220, position: "relative", left: 20}}>
                                这是简介
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="汇编" extra={<a href="#">修改</a>}
                                  style={{width: 250, height: 220}}>
                                <p>这是简介</p>
                                <p>这是简介</p>
                                <p>这是简介</p>
                            </Card>>
                        </Col>
                        <Col span={6}>
                            <Card title="汇编" extra={<a href="#">修改</a>}
                                  style={{width: 250, height: 220}}>
                                <p>这是简介</p>
                                <p>这是简介</p>
                                <p>这是简介</p>
                            </Card>>
                        </Col>
                        <Col span={6}>
                            <Card title="汇编" extra={<a href="#">修改</a>}
                                  style={{width: 250, height: 220}}>
                                <p>这是简介</p>
                                <p>这是简介</p>
                                <p>这是简介</p>
                            </Card>
                        </Col>
                    </Row>
                </div>


                <div>
                    <br></br>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Card title="C语言" extra={<a href="#">修改</a>}
                                  style={{width: 250, height: 220, position: "relative", left: 20}}>
                                这是简介
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card title="汇编" extra={<a href="#">修改</a>}
                                  style={{width: 250, height: 220}}>
                                <p>这是简介</p>
                                <p>这是简介</p>
                                <p>这是简介</p>
                            </Card>>
                        </Col>
                        <Col span={6}>
                            <Card title="汇编" extra={<a href="#">修改</a>}
                                  style={{width: 250, height: 220}}>
                                <p>这是简介</p>
                                <p>这是简介</p>
                                <p>这是简介</p>
                            </Card>>
                        </Col>
                        <Col span={6}>
                            <Card title="汇编" extra={<a href="#">修改</a>}
                                  style={{width: 250, height: 220}}>
                                <p>这是简介</p>
                                <p>这是简介</p>
                                <p>这是简介</p>
                            </Card>>
                        </Col>
                    </Row>
                </div>
                <hr></hr>
                <div>
                    <p></p>
                </div>
            </div>
        )


        return <Layout>
            <Modal
                title="创建课程"
                visible={this.state.dataVisible}
                onOk={this.handleOk}
                className="CreateSubjectModel"
                onCancel={this.handleCancel}
                footer={false}
                width={modalWidth}
            >

                <Row>
                    <Col span={8}>
                        <img className="imgPhoto" src="https://www.baidu.com/img/bd_logo1.png" width="50" height="50"/>
                        <h2>创建课程</h2>
                        <FormItem label="课程名称" {...formItemLayout}>
                            <TextArea value="C语言" disabled/>
                        </FormItem>
                        <FormItem label="简介" {...formItemLayout}>
                            <TextArea value="xxx" disabled/>
                        </FormItem>
                    </Col>
                    <Col span={5}>
                        <img className="imgPhoto" src="https://www.baidu.com/img/bd_logo1.png" width="50" height="50"/>
                    </Col>

                </Row>
                <Row>
                    <Button type="primary" htmlType="submit">确认创建</Button>
                    <Button style={{ marginLeft: 8 }} onClick={this.handleCancel}>
                        取消
                    </Button>
                </Row>
            </Modal>
        </Layout>
    }
}

export default Subject;

