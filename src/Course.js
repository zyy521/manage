import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row, Tabs} from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import CreateExpForm from './component/CreateExpForm'
import ApplyCourseForm from './component/ApplyCourseForm'
import axios from 'axios';

const TabPane = Tabs.TabPane,
    FormItem = Form.Item,
    { TextArea } = Input;

class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseVisible: false,
            myCourseList: [],
            allCourseList: []
        };

    }

    componentDidMount () {
        this.getMyCourseList();
        this.getCourseList();
    }

    createCourse = (e) => {
        this.setState({
            createCourseVisible: true
        })
    };

    applySubject = (e) => {
        this.setState({
            applyCourseVisible: true
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
                newState.courseTitle = this.state.allCourseList[i].name;
                newState.courseInfo = this.state.allCourseList[i].brief;
            }
        }
        this.setState(newState);
    };

    // 获取实验课列表
    getMyCourseList =()=> {
        axios.get('/web/ep/list',{}).then((res)=>{
            const result = res.data,
                newState = {myCourseList: result.list ? result.list : []};
            this.setState(newState);
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    // 获取所有课程(type:0为我的课程，type:1为所有课程)
    getCourseList =()=> {
        axios.get('/web/course/list',{}).then((res)=>{
            const result = res.data,
                newState = {allCourseList: result.list ? result.list : []};
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
                    <Card title={item.name} hoverable={true} bordered={true} onClick={this.onCourseClick.bind(this, type, item.id)} style={{ marginTop: 16 }}>{item.brief}</Card>
                </Col>);
            } else {
                const link = "/index/course/" + item.id;
                itemArr.push(<Col span={6} key={item.id}>
                        <Link to={link}>
                            <Card title={item.name} hoverable={true} bordered={true} style={{ marginTop: 16 }}>{item.briefIntroduction ? item.briefIntroduction : "暂无简介"}</Card>
                        </Link>
                    </Col>
                );
            }
        });
        return <Row gutter={16}>
            {itemArr}
        </Row>
    };

    // 取消实验课创建
    handleCreateCourseCancel =()=> {
        this.setState({
            createCourseVisible: false
        })
    };
    //取消申请
    handleApplyCourseCancel =()=> {
        this.setState({
            applyCourseVisible: false
        })
    };

    // 关闭弹窗
    handleCourseInfoCancel =()=> {
        this.setState({
            courseVisible: false
        })
    };

    render() {
        const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
        const operations = <div>
            <Button type="primary" onClick={this.createCourse} style={{marginRight: "5px"}}>创建实验课</Button>
            <Button type="default" onClick={this.applySubject}>申请课程</Button>
        </div>,
            formItemLayout = {
                labelCol: { span: 5 },
                wrapperCol: { span: 19 },
            },
            myCourseList = this.renderCourse(this.state.myCourseList,0),
            allCourseList = this.renderCourse(this.state.allCourseList,1),
            NewCreateExpForm = Form.create()(CreateExpForm),
            NewApplyCourseForm = Form.create()(ApplyCourseForm);
        return (
            <div className="gutter-example">
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                    <TabPane tab="我的实验课" key="1">
                        <div className="items-bar">
                            <span style={{color: "#2DC3E8"}}>{loginInfo.name}</span>老师，你好！目前你一共有{this.state.myCourseList.length}门实验课。
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
                    onCancel={this.handleCourseInfoCancel}
                    footer={null}
                    >
                    <Form>
                        <FormItem {...formItemLayout}
                            label="实验课程">
                            <Input disabled defaultValue={this.state.courseTitle} />
                        </FormItem>
                        <FormItem {...formItemLayout}
                            label="实验名称">
                            <TextArea style={{width: "100%"}}  rows={4} disabled defaultValue={this.state.courseInfo} />
                        </FormItem>
                    </Form>
                </Modal>
                <NewCreateExpForm visible={this.state.createCourseVisible} handleCancel={this.handleCreateCourseCancel} refreshList={this.getMyCourseList} />
                <NewApplyCourseForm visible={this.state.applyCourseVisible} handleCancel={this.handleApplyCourseCancel} />
            </div>
        )
    }
}

export default Course;
