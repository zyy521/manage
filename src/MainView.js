/**
 * Created by czw on 2018/1/6.
 */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import { Layout, Menu, Icon,Dropdown } from 'antd';
import WorkSpace from './WorkSpace';
const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;
class MainView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            logined: true
        }
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
                    <a target="_blank" rel="noopener noreferrer">查看密码</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer">修改资料</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" onClick={this.onLoginOut}>退出</a>
                </Menu.Item>
            </Menu>
        );
        return <Layout>
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
            <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Router>
                    <Menu
                        style={{ width: 200 }}
                        defaultSelectedKeys={['0']}
                        defaultOpenKeys={['sub1']}
                    >
                        <Menu.Item key="0">
                           <Link to="/index/workspace"> <Icon type="layout" />
                               工作台</Link>
                        </Menu.Item>

                        <Menu.Item key="1">
                            <Icon type="database" />
                            课程管理
                        </Menu.Item>

                        <Menu.Item key="2">
                            <Icon type="mail" />
                            实验课管理
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Icon type="mail" />
                            消息管理
                        </Menu.Item>

                        <Menu.Item key="4">
                            <Icon type="dashboard" />
                            实验室管理
                        </Menu.Item>

                        <Menu.Item key="5">
                            <Icon type="video-camera" />
                            教学文档/视频
                        </Menu.Item>

                        <Menu.Item key="6">
                            <Icon type="mail" />
                            权限设置
                        </Menu.Item>

                        <Menu.Item key="7">
                            <Icon type="mail" />
                            个人中心
                        </Menu.Item>
                    </Menu>
                    </Router>
                </Sider>
                <Layout style={{ padding: '0 10px' }}>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 700 }}>
                        <Route path="/index/workspace" component={WorkSpace}/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>

    }
}

export default MainView;