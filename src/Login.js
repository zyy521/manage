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
            loginType: "2",
            logined: false,
            idNumber: "",
            password: ""
        }

        window.loginInfo = [];
    }

    onChange(key){
        const selectType = key;
        if(selectType === "2"){
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
        if(!this.state.idNumber){
            message.warning('请输入用户名！')
            return false;
        }else if(!this.state.password){
            message.warning('请输入密码！')
            return false;
        }

        axios.post('/web/user/login',{
            idNumber: obj.state.idNumber,
            password: obj.state.password,
            type: obj.state.loginType
        }).then((res)=>{
            if(res.data && res.data.success){
                sessionStorage.setItem("loginInfo", JSON.stringify(res.data.entity));
                obj.setState({
                    logined: true
                });
                sessionStorage.setItem("userId",res.data.entity.id);
            }else{
                message.error(res.data.errorMessage)
            }
            console.log(res.data);
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    onChangeUserName = (e) =>{
        this.setState({ idNumber: e.target.value });
    }

    onChangePassword = (e) =>{
        this.setState({ password: e.target.value });
    }

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
                        <TabPane tab="学生" key="2"></TabPane>
                        <TabPane tab="教师" key="1"></TabPane>
                    </Tabs>

                    <Input placeholder={this.state.pName} type="text"  value={this.state.idNumber}
                           onChange={this.onChangeUserName}
                           style={{marginTop: 40,marginBottom: 10,width: 300}}/>
                    <Input placeholder={this.state.pPswword} type="password" value={this.state.password}
                           onChange={this.onChangePassword}
                           onPressEnter={this.onLogin}
                           style={{marginTop: 10,marginBottom: 10,width: 300}}/>
                    <Button type="primary" className="Login-btn" onClick={this.onLogin}>登录</Button>
                </div>
            </div>
        );
    }
}

export default Login;
