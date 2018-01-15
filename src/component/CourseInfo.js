/**
 * Created by czw on 2018/1/13.
 */
import React from 'react';
import {Button, Form, Card, Col, Input, Layout, Modal, Row, Table} from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import ExperForm from './ExperForm'

class CourseInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            epCourseName: "",
            experimentList: [],
            formData: {}
        };
        this.columns = [{
            title: '序号',
            dataIndex: 'index',
            width: 80
        }, {
            title: '实验名称',
            dataIndex: 'epName'
        }, {
            title: '状态',
            dataIndex: 'uploadEndTime',
            render: (text) => {
                const uploadData = new Date(text).getTime(),
                    dateNow = new Date().getTime();
                let renderText = "进行中";
                if (uploadData < dateNow) {
                    renderText = "已结束"
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
                const link = "/index/readHomework/" + text;
                return (
                    <div>
                        <Button onClick={this.openEditDialog.bind(this,text)}>详情</Button>&nbsp;
                        <Link to={link}><Button>批阅作业</Button></Link>
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
        axios.get('/web/epRecord/list',{
            params: {
                epId: id
            }
        }).then((res)=>{
            const result = res.data,
                newState = {
                    experimentList: result.list
                };
            axios.get('/web/ep',{
                params: {
                    id: id
                }
            }).then((res)=>{
                const result = res.data;
                newState.epCourseName = result.entity.name;
                this.setState(newState);
            }).catch((err)=>{
                console.log(err.status);
            })
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
        axios.get('/web/epRecord',{
            params: {
                id: id
            }
        }).then((res)=>{
            const result = res.data,
                newState = {
                    experModalVisible: true,
                    experModalName: "修改实验",
                    formData: result.entity,
                    dialogType: "look"
                };
            newState.formData.epCourseName = this.state.epCourseName;
            this.setState(newState);
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    // 打开发布新实验弹窗
    onReleaseExp =()=> {
        const newState = {
            experModalVisible: true,
            experModalName: "发布新实验",
            dialogType: "create",
            formData: {epCourseName: this.state.epCourseName}
        };
        this.setState(newState);
    };

    // 关闭弹窗
    handleCancel =()=> {
        this.setState({
            experModalVisible: false
        })
    };

    render() {
        const NewExperForm = Form.create()(ExperForm);
        return (
            <div>
                <div className="button10">
                    <Row>
                        <Col span={10}>
                            <h3>
                                {this.state.epCourseName}
                            </h3>
                        </Col>
                        <Col span={14}>
                            <div className="text-right">
                                <Button type="default" onClick={this.onBack} style={{marginRight: "5px"}}>返回</Button>
                                <Button type="default" style={{marginRight: "5px"}}>发送课程消息</Button>
                                <Button type="primary" onClick={this.onReleaseExp}>发布新实验</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Table rowKey="id" columns={this.columns} dataSource={this.state.experimentList} />
                </div>
                <NewExperForm visible={this.state.experModalVisible} epId={this.props.match.params.id} refreshData={this.getData} title={this.state.experModalName} formData={this.state.formData} type={this.state.dialogType} handleCancel={this.handleCancel} />
            </div>
        )
    }
}
export default CourseInfo;