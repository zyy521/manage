import React, { Component } from 'react';
import { Button,Input,Tabs, message } from 'antd';
import './App.css';
const { TabPane } = Tabs;
class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            pName: "请输入学号",
            pPswword: "请输入密码",
            loginType: "1"
        }
    }

    onChange(key){
        const selectType = key;
        if(selectType === "1"){
            this.setState({
                pName: "请输入学号",
                pPswword: "请输入密码",
            });
        }else{
            this.setState({
                pName: "请输入工号",
                pPswword: "请输入密码",
            });
        }

        this.setState({
            loginType: key,
        });
    }

    login(){
        if(!this.state.pName){

        }
    }

    render() {
        return (
            <div className="App">
                <div className="Main-view">
                    <div className="Login-bg">
                        <div className="Login-title">浙理实验课管理平台</div>
                        <div className="Login-title2">在这里 , 成长为更好的自己</div>
                    </div>

                    <Tabs defaultActiveKey={this.state.loginType} onChange={this.onChange.bind(this)} style={{ marginTop: 16 }}>
                        <TabPane tab="学生" key="1"></TabPane>
                        <TabPane tab="教师" key="2"></TabPane>
                    </Tabs>

                    <Input placeholder={this.state.pName}  style={{marginTop: 40,marginBottom: 10,width: 300}}/>
                    <Input placeholder={this.state.pPswword} style={{marginTop: 10,marginBottom: 10,width: 300}}/>
                    <Button type="primary" className="Login-btn" onClick={this.login.bind(this)}>登录</Button>
                </div>
            </div>
        );
    }
}

export default App;
