/**
 * Created by czw on 2018/1/14.
 */
import React from 'react';
import {Button, Form, Card, Col, Input, Layout, Modal, Row, Table,InputNumber} from 'antd';
import axios from 'axios';

class CourseInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            homeworkList: []
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            width: 80
        }, {
            title: '姓名',
            dataIndex: 'title'
        }, {
            title: '实验报告名称',
            dataIndex: 'state'
        }, {
            title: '操作',
            dataIndex: 'id',
            width: 200,
            render: (text) => {
                return (
                    <div>
                        <Button>下载</Button>&nbsp;
                        <Button>查看</Button>
                    </div>
                )
            }
        }, {
            title: '评分',
            dataIndex: 'id',
            width: 200,
            render: (text) => {
                return (
                    <InputNumber defaultValue={text} />
                )
            }
        }, {
            title: '评语',
            dataIndex: 'id',
            width: 200,
            render: (text) => {
                return (
                    <Input />
                )
            }
        }];
    }
    componentDidMount () {
        this.getData();
    };

    // 返回
    onBack =()=> {
        this.props.history.go(-1);
    };

    getData =()=> {

    };
    render() {
        return (
            <div>
                <div className="button10">
                    <Row>
                        <Col span={10}>
                            <h3>
                                {this.state.courseName}
                            </h3>
                        </Col>
                        <Col span={14}>
                            <div className="text-right">
                                <Button type="default" onClick={this.onBack} style={{marginRight: "5px"}}>返回</Button>
                                <Button type="primary" disabled>导出分数</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Table rowKey="id" columns={this.columns} dataSource={this.state.homeworkList} />
                </div>
            </div>
        )
    }
}
export default CourseInfo;