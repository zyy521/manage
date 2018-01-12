import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row, Tabs} from 'antd';

const TabPane = Tabs.TabPane,
    FormItem = Form.Item;

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseVisible: false
        };
    }

    createCourse = (e) => {
        this.setState({
            dataVisible: true
        })
    };

    applySubject = (e) => {
        this.setState({
            dataVisible: true
        })
    };

    // 点击课程
    onCourseClick =()=> {
        this.setState({
            courseVisible: true,
            courseTitle: "C语言",
            courseInfo: "xxxxxxxxxxxxx"
        })
    };

    // 渲染课程
    renderCourse =()=> {
        return <Row gutter={16}>
            <Col span={6}>
                <Card title="C语言" bordered={false} bordered={true} onClick={this.onCourseClick}>Card content</Card>
            </Col>
            <Col span={6}>
                <Card title="汇编语言实" bordered={false} bordered={true}>Card content</Card>
            </Col>
            <Col span={6}>
                <Card title="C语言" bordered={false} bordered={true}>Card content</Card>
            </Col>
        </Row>
    };

    render() {
        const operations = <div>
            <Button type="primary" onClick={this.createCourse} style={{marginRight: "5px"}}>创建实验课</Button>
            <Button type="default" onClick={this.applySubject}>申请课程</Button>
        </div>,
            items = this.renderCourse();
        return (
            <div className="gutter-example">
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                    <TabPane tab="我的实验课" key="1">
                        <div className="items-bar">
                            许建龙老师，你好！目前你一共有8门实验课。
                        </div>
                        <div>
                            {items}
                        </div>
                    </TabPane>
                    <TabPane tab="所有课程" key="2">
                        <div className="items-bar">
                            目前平台上共开设了10门课程，请单击课程创建实验课。
                        </div>
                        <div>
                            {items}
                        </div>
                    </TabPane>
                </Tabs>
                <Modal
                    title="课程信息"
                    visible={this.state.courseVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <Form>
                        <FormItem label="课程名称">
                            <Input value={this.state.courseTitle} />
                        </FormItem>
                        <FormItem label="课程简介">
                            <Input value={this.state.courseInfo} />
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Course;
