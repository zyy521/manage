import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row, Tabs} from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import axios from 'axios';

const TabPane = Tabs.TabPane;
class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseVisible: false,
            allCourseList: []
        };

    }

    componentDidMount () {
        this.getCourseList();
    }

    // 获取所有课程(type:0为我的课程，type:1为所有课程)
    getCourseList =()=> {
        axios.get('/web/ep/list',{}).then((res)=>{
            const result = res.data,
                newState = {allCourseList: result.list ? result.list : []};
            this.setState(newState);
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    // 渲染课程
    renderCourse =()=> {
        let itemArr = [];
        this.state.allCourseList.forEach((item) => {
            const link = "/index/readHomework/" + item.id;
            itemArr.push(<Col span={6} key={item.id}>
                    <Link to={link}>
                        <Card title={item.name} hoverable={true} bordered={true} style={{ marginTop: 16 }}>{item.briefIntroduction ? item.briefIntroduction : "暂无简介"}</Card>
                    </Link>
                </Col>
            );
        });
        return <Row gutter={16}>
            {itemArr}
        </Row>
    };

    render() {
        const allCourseList = this.renderCourse();
        return (
            <div className="gutter-example">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="所有课程" key="1">
                        <div>
                            {allCourseList}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default Course;
