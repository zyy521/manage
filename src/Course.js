import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row, Tabs} from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import axios from 'axios';

const TabPane = Tabs.TabPane,
    FormItem = Form.Item,
    { TextArea } = Input;

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseVisible: false,
            allCourseList: []
        };
    }

    componentDidMount () {
        this.getCourseList(0);
        this.getCourseList(1);
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
    onCourseClick =(type,id)=> {
        if (type === 1) {
            this.onClickAllCourseItem(id);
        }
    };

    // 点击所有课程
    onClickAllCourseItem =(id)=> {
        let newState = {courseVisible: true};
        for (let i = 0,len = this.state.allCourseList.length;i < len;i ++) {
            if (this.state.allCourseList[i].id === id) {
                newState.courseTitle = this.state.allCourseList[i].courseName;
                newState.courseInfo = this.state.allCourseList[i].courseInfo;
            }
        }
        this.setState(newState);
    };

    // 获取所有课程(type:0为我的课程，type:1为所有课程)
    getCourseList =(type)=> {
        axios.get('../data/course.json',{
            idNumber: '101010',
            password: '123456',
            type: "0"
        }).then((res)=>{
            const result = res.data,
                newState = {};
            if (type === 0) {
                newState.myCourseList = result.body
            } else {
                newState.allCourseList = result.body
            }
            this.setState(newState);
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    // 渲染课程
    renderCourse =(datas,type)=> {
        let itemArr = [];
        datas.forEach((item) => {
            if(type === 1) {
                itemArr.push(<Col span={6} key={item.id}>
                    <Card title={item.courseName} hoverable={true} bordered={true} onClick={this.onCourseClick.bind(this, type, item.id)}>{item.courseInfo}</Card>
                </Col>);
            } else {
                const link = "/index/course/" + item.id;
                itemArr.push(<Col span={6} key={item.id}>
                        <Link to={link}>
                            <Card title={item.courseName} hoverable={true} bordered={true}>共{item.stuNum}位学生</Card>
                        </Link>
                    </Col>
                );
            }
        });
        return <Row gutter={16}>
            {itemArr}
        </Row>
    };

    // 关闭弹窗
    handleCancel =()=> {
        this.setState({
            courseVisible: false
        })
    };

    render() {
        const operations = <div>
            <Button type="primary" onClick={this.createCourse} style={{marginRight: "5px"}}>创建实验课</Button>
            <Button type="default" onClick={this.applySubject}>申请课程</Button>
        </div>,
            myCourseList = this.renderCourse(this.state.allCourseList,0),
            allCourseList = this.renderCourse(this.state.allCourseList,1);
        return (
            <div className="gutter-example">
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                    <TabPane tab="我的实验课" key="1">
                        <div className="items-bar">
                            许建龙老师，你好！目前你一共有8门实验课。
                        </div>
                        <div>
                            {myCourseList}
                        </div>
                    </TabPane>
                    <TabPane tab="所有课程" key="2">
                        <div className="items-bar">
                            目前平台上共开设了{this.state.allCourseList.length}门课程，请单击课程创建实验课。
                        </div>
                        <div>
                            {allCourseList}
                        </div>
                    </TabPane>
                </Tabs>
                <Modal
                    title="课程信息"
                    visible={this.state.courseVisible}
                    onCancel={this.handleCancel}
                    footer={null}
                    >

                </Modal>
            </div>
        )
    }
}

export default Course;
