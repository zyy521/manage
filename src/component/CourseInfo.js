/**
 * Created by czw on 2018/1/13.
 */
import React from 'react';
import {Button, Form, Card, Col, Input, Layout, Modal, Row, Table} from 'antd';
import axios from 'axios';
import ExperForm from './ExperForm'

class CourseInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            courseName: "",
            experimentList: []
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            width: 80
        }, {
            title: '实验名称',
            dataIndex: 'title'
        }, {
            title: '状态',
            dataIndex: 'state',
            render: (text) => {
                let renderText = "";
                switch (text) {
                    case 0:
                        renderText = "未开始";
                        break;
                    case 1:
                        renderText = "进行中";
                        break;
                    case 2:
                        renderText = "已结束";
                        break;
                }
                return (
                    renderText
                )
            }
        }, {
            title: '操作',
            dataIndex: 'id',
            width: 200,
            render: (text) => {
                return (
                    <div>
                        <Button onClick={this.openEditDialog.bind(this)}>修改</Button>&nbsp;
                        <Button>批阅作业</Button>
                    </div>
                )
            }
        }];
    }
    componentDidMount () {
        this.getData();
    };
    // 获取数据
    getData =()=> {
        const id = this.props.match.params.id;
        axios.get('../../data/courseInfo.json',{
            id: id
        }).then((res)=>{
            const result = res.data,
                newState = {
                    courseName: result.body.courseName,
                    experimentList: result.body.experimentList
                };
            this.setState(newState);
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    // 返回
    onBack =()=> {
        this.props.history.go(-1);
    };

    // 打开实验弹窗
    openEditDialog =(id)=> {
        axios.get('../../data/experInfo.json',{
            id: id
        }).then((res)=>{
            const result = res.data,
                newState = {
                    experModalVisible: true,
                    experModalName: "修改实验",
                    formData: result.body
                };
            this.setState(newState);
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    // 确认保存
    handleOk =()=> {

    };

    // 关闭弹窗
    handleCancel =()=> {
        this.setState({
            experModalVisible: false
        })
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
                                <Button type="default" style={{marginRight: "5px"}}>发送课程消息</Button>
                                <Button type="primary">发布新实验</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Table rowKey="id" columns={this.columns} dataSource={this.state.experimentList} />
                </div>
                <Modal
                    title={this.state.experModalName}
                    visible={this.state.experModalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认保存"
                    cancelText="取消"
                    >
                    <ExperForm formData={this.state.formData} />
                </Modal>
            </div>
        )
    }
}
export default CourseInfo;