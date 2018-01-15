/**
 * Created by czw on 2018/1/14.
 */
import React from 'react';
import {Button, Form, Card, Col, Input, Layout, Modal, Row, Table,InputNumber,message, Upload} from 'antd';
import axios from 'axios';

const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
class CourseInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            homeworkList: []
        };
        this.columns = (loginInfo.type === 1) ? [{
            title: '序号',
            dataIndex: 'index',
            width: 80
        }, {
            title: '姓名',
            dataIndex: 'uploadName'
        }, {
            title: '实验报告名称',
            dataIndex: 'epFileName'
        }, {
            title: '操作',
            dataIndex: 'epFileUrl',
            width: 200,
            render: (text) => {
                return (
                    <div>
                        <Button onClick={this.onDownLoad.bind(this,text)}>下载</Button>
                    </div>
                )
            }
        }, {
            title: '评分',
            dataIndex: 'score',
            width: 160,
            render: (text,record) => {
                return (
                    <InputNumber min={0} max={100} defaultValue={text} onChange={this.onChangeScore.bind(this,record.studentId)} onBlur={this.onEdit.bind(this,record.studentId)} />
                )
            }
        }, {
            title: '评语',
            dataIndex: 'comment',
            width: 200,
            render: (text,record) => {
                return (
                    <Input defaultValue={text} onInput={this.onChangeComment.bind(this,record.studentId)} onBlur={this.onEdit.bind(this,record.studentId)} />
                )
            }
        }] : [{
            title: '序号',
            dataIndex: 'index',
            width: 80
        },{
            title: '实验报告名称',
            dataIndex: 'epFileName'
        }, {
            title: '操作',
            dataIndex: 'id',
            width: 200,
            render: (text) => {
                return (
                    <div>
                        <Upload action="/web/epDetail/add" data={{"epId": this.props.match.params.id,"epRecordId": text}}>
                            <Button>上传报告</Button>
                        </Upload>
                    </div>
                )
            }
        }];
        this.params = {
            epRecordId: this.props.match.params.id,
            page: 0
        }

    }
    componentDidMount () {
        this.getData();
    };

    // 返回
    onBack =()=> {
        this.props.history.go(-1);
    };

    // 上传报告
    onUpLoad =()=> {

    };

    // 下载
    onDownLoad =(text)=> {
        location.href = text;
    };

    getData =()=> {
        axios.get('/web/epDetail/list',{
            params: this.params
        }).then((res)=>{
            let list = res.data.list.forEach((item,index) => {
                    let newItem = item;
                    newItem.index = index + 1;
                    return newItem;
                }),
                newState = {homeworkList: res.data.list};
            if(loginInfo.type === 1) {
                axios.get('/web/epRecord',{
                    params: {
                        id: this.props.match.params.id
                    }
                }).then((resData)=>{
                    newState.epName = resData.data.entity.epName;
                    this.setState(newState);
                }).catch((err)=>{
                    console.log(err.status);
                });
            } else {
                axios.get('/web/ep',{
                    params: {
                        id: this.props.match.params.id
                    }
                }).then((resData)=>{
                    newState.epName = resData.data.entity.name;
                    this.setState(newState);
                }).catch((err)=>{
                    console.log(err.status);
                });
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    onChangeScore =(id, value)=> {
        for(let i = 0,len = this.state.homeworkList.length;i < len;i ++) {
            if (this.state.homeworkList[i].studentId === id) {
                this.state.homeworkList[i].score = value ? value : 0;
                break;
            }
        }
    };
    onChangeComment =(id, e)=> {
        console.log(e.target.value);
        for(let i = 0,len = this.state.homeworkList.length;i < len;i ++) {
            if (this.state.homeworkList[i].studentId === id) {
                this.state.homeworkList[i].comment = e.target.value ? e.target.value : "";
                break;
            }
        }
    };

    // 修改分数评语
    onEdit =(id)=> {
        let praram = {};
        for (let i = 0,len = this.state.homeworkList.length;i < len;i ++) {
            if (this.state.homeworkList[i].studentId === id) {
                praram = this.state.homeworkList[i];
                break;
            }
        }
        axios.post('/web/epDetail/update',praram).then((res)=>{
            if(res.data.success) {
                message.success("保存成功！");
            }else {
                Modal.error({
                    title: '提示',
                    content: res.data.errorMessage,
                });
            }

        }).catch((err)=>{
            console.log(err.status);
        })
    };
    render() {
        return (
            <div>
                <div className="button10">
                    <Row>
                        <Col span={10}>
                            <h3>
                                {this.state.epName}
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