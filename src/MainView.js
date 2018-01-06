/**
 * Created by czw on 2018/1/6.
 */
import React, { Component } from 'react';
import { Button,Input,Tabs, Radio } from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter} from 'react-router-dom'

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
        return (
            <div style={{color: "#000"}}>
                登录成功
                <Button onClick={this.onLoginOut}>退出</Button>
            </div>
        );
    }
}

export default MainView;
