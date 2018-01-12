/**
 * Created by czw on 2018/1/6.
 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import { Layout, Menu, Icon,Dropdown,Modal,Row,Col,Form,Input} from 'antd';
import WorkSpace from './WorkSpace';
import Subject from './Subject';
import Lab from './Lab'
import Course from './Course';
import Message from './Message';
import Authority from './Authority';
const { SubMenu } = Menu;
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
};
const minHeight = window.innerHeight + 20;
const modalWidth = 866;
const { Header, Content, Sider } = Layout;
class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            logined: true,
            dataVisible: false,
            userName: "陈瑶琪",
            userNum: "2014329620037"
        }
    }

    scanInfo=() =>{
        this.setState({
            dataVisible: true
        })
    }

    handleCancel = (e) => {
        this.setState({
            dataVisible: false,
        });
    }

    onLoginOut =()=> {
        this.setState({
            logined: false
        })
    };

    render() {
        if (!this.state.logined) {
            return (
                <Redirect to="/login"/>
            )
        }


        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.scanInfo}>查看资料</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">修改密码</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.onLoginOut}>退出</a>
                </Menu.Item>
            </Menu>
        );
        return <Layout>
            <Modal
                title="资料详情"
                visible={this.state.dataVisible}
                onOk={this.handleOk}
                className="detailModal"
                onCancel={this.handleCancel}
                footer={false}
                width={modalWidth}
            >
                <Row>
                    <Col span={8}>
                        <img className="imgPhoto" src="https://www.baidu.com/img/bd_logo1.png" width="50" height="50"/>
                        <FormItem label="姓名" {...formItemLayout}>
                                <Input value={this.state.userName} disabled/>
                        </FormItem>
                        <FormItem label="学号" {...formItemLayout}>
                            <Input value={this.state.userNum} disabled/>
                        </FormItem>
                        <FormItem label="专业" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="班级" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="入学日期" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="籍贯" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="民族" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="出生日期" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="政治面貌" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="手机号码" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="邮箱" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="家庭住址" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="简介" {...formItemLayout}>
                            <TextArea value="xxx" disabled/>
                        </FormItem>
                    </Col>
                </Row>
            </Modal>
            <Header className="header">
                <div className="logo" />
                <Icon type="apple" style={{ fontSize: 25, color: '#fff' }} />
                <span style={{ fontSize: 16, color: '#fff',paddingLeft: 10 }}>实验课管理平台</span>

                <Dropdown overlay={menu}>
                    <a style={{ fontSize: 16, color: '#fff',paddingLeft: 10,float: 'right'}} href="#">
                        我是教师 <Icon type="down" />
                    </a>
                </Dropdown>
            </Header>

            <Router>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            style={{ width: 200 }}
                            defaultSelectedKeys={['0']}
                            defaultOpenKeys={['sub1']}
                        >
                            <Menu.Item key="0">
                               <Link to="/index"> <Icon type="layout" />
                                   工作台</Link>
                            </Menu.Item>

                            <Menu.Item key="1">
                                <Link to="/index/subject"><Icon type="database" />
                                    课程管理</Link>
                            </Menu.Item>

                            <Menu.Item key="2">
                                <Link to="/index/course">
                                <Icon type="mail" />
                                实验课管理</Link>
                            </Menu.Item>

                            <Menu.Item key="3">
                                <Link to="/index/message"><Icon type="mail" />
                                消息管理</Link>
                            </Menu.Item>

                            <Menu.Item key="4">
                                <Link to="/index/lab"><Icon type="dashboard" />
                                    实验室管理</Link>
                            </Menu.Item>

                            <Menu.Item key="5">
                                <Icon type="video-camera" />
                                教学文档/视频
                            </Menu.Item>

                            <Menu.Item key="6">
                                <Link to="/index/authority"><Icon type="contacts" />
                                    权限设置</Link>
                            </Menu.Item>

                            <Menu.Item key="7">
                                <Icon type="mail" />
                                个人中心
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 10px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: minHeight }}>
                            <Route exact path="/index" component={WorkSpace}/>
                            <Route path="/index/subject" component={Subject}/>
                            <Route path="/index/course" component={Course}/>
                            <Route path="/index/lab" component={Lab}/>
                            <Route path="/index/message" compmnent={Message}/>
                            <Route path="/index/authority" compmnent={Authority}/>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        </Layout>

    }
}

export default MainView;