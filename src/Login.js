/**
 * Created by czw on 2018/1/6.
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Button,Input,Tabs,message} from 'antd';
import {Redirect} from 'react-router-dom'

const { TabPane } = Tabs;
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pName: "请输入学号",
            pPswword: "请输入密码",
            loginType: "1",
            logined: false,
            idNumber: "",
            password: ""
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

    onLogin =()=> {

        let obj = this;
        /*if(!this.state.idNumber){
            message.warning('请输入用户名！')
            return false;
        }else if(!this.state.password){
            message.warning('请输入密码！')
            return false;
        }*/

        axios.post('/web/user/login',{
            idNumber: '101010',
            password: '123456',
            type: "0"
        }).then((res)=>{
            if(res.data && res.data.success){
                obj.setState({
                    logined: true
                })
            }
            console.log(res.data);
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    render() {
        if (this.state.logined) {
            return (
                <Redirect to="/index"/>
            )
        }
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

                    <Input placeholder={this.state.pName} type="text"  style={{marginTop: 40,marginBottom: 10,width: 300}}/>
                    <Input placeholder={this.state.pPswword} type="password"  style={{marginTop: 10,marginBottom: 10,width: 300}}/>
                    <Button type="primary" className="Login-btn" onClick={this.onLogin}>登录</Button>
                </div>
            </div>
        );
    }
}

export default Login;
