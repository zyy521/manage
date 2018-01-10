import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row} from 'antd';

class Course extends React.Component {

    createCourse = (e) => {
        this.setState({
            dataVisible: true
        })
    }

    applySubject = (e) => {
        this.setState({
            dataVisible: true
        })
    }

    //切换我的实验课和所有课程
    onCourseTypeClick(type) {
        let obj = this;
        this.setState({
            courseType: type,
            tableLoading: true
        }, function () {

        });
    }

    render() {
        return (
            <div className="gutter-example">
                <div className="subject-tab subject-tab-border">
                    <a href="#" onClick={this.onCourseTypeClick.bind(this, 1)}> 我的实验课</a>
                    <a href="#" onClick={this.onCourseTypeClick.bind(this, 2)}> 所有课程</a>
                    <Button type="default" style={{position: "relative", left: 800}}
                            onClick={this.createCourse}>创建实验课</Button>
                    <Button type="primary" style={{position: "relative", left: 888}}
                            onClick={this.applySubject}>申请课程</Button>
                </div>
            </div>
        )
    }
}

export default Course;
