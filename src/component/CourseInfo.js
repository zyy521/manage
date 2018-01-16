/**
 * Created by czw on 2018/1/13.
 */
import React from 'react';
import {Button, Form, Card, Col, Input, Layout, Modal,Row,Tabs,Table,message,Upload,Icon} from 'antd';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'
import axios from 'axios';
import ExperForm from './ExperForm'
const modalWidth = 600;
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
}
class CourseInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            epCourseName: "",
            experimentList: [],
            formData: {},
            sendCourseVisible: false,
            studentVisible: false,
            fileList: []
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
            let result = res.data,
                newState = {};
            let list = result.list.map((item,index) => {
                let newItem = item;
                newItem.index = index+1;
                return newItem;
            });
            newState.experimentList = list;
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


    sendCourseMsg =()=>{
        this.setState({
            sendCourseVisible: true
        })
    }

    // 关闭弹窗
    handleCancel =()=> {
        this.setState({
            experModalVisible: false,
            sendCourseVisible: false,
            studentVisible: false
        })
    };

    changeTitle = (e) => {
        this.setState({ title: e.target.value });
    }

    changeContent = (e) => {
        this.setState({ content: e.target.value });
    }

    cancelSendMsg =()=> {
        this.setState({
            sendCourseVisible: false
        })
    }

    importStudent =()=> {
        this.setState({
            studentVisible: true
        })
    }


    upLoadStudent = ()=> {
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append('file', fileList[0]);
        formData.append('epId', this.props.match.params.id);
        let obj = this;
        this.setState({
            uploading: true,
        });
        let config = {
            headers:{'Content-Type':'multipart/form-data'}
        };
        axios.post("/web/ep/importStudent",formData,config).then((res)=>{
            if(res.data && res.data.success){
                message.success("导入成功");
                obj.setState({
                    fileList: [],
                    studentVisible: false
                });
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    cancelStudent  = ()=> {
        this.setState({
            studentVisible: false
        })
    }

    sureSendMsg =()=>{
        if(!this.state.title){
            message.warning("请输入消息标题")
            return false;
        }else if(!this.state.content){
            message.warning("请输入消息内容")
            return false;
        }

        const url = "/web/msg/send";
        let obj = this;
        axios.post(url + '?title=' + this.state.title +"&content=" + this.state.content + "&epId=" + this.props.match.params.id).then((res)=>{
            if(res.data && res.data.success){
                message.success("消息发布成功！")
                obj.setState({
                    sendCourseVisible: false,
                });
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    render() {
        const NewExperForm = Form.create()(ExperForm);
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
            multiple: false,
        };

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
                                <Button type="default" onClick={this.sendCourseMsg} style={{marginRight: "5px"}}>发送课程消息</Button>
                                <Button type="primary" onClick={this.onReleaseExp} style={{marginRight: "5px"}}>发布新实验</Button>
                                <Button type="primary" onClick={this.importStudent}>导入学生</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Table rowKey="id" columns={this.columns} dataSource={this.state.experimentList} />
                </div>
                <NewExperForm visible={this.state.experModalVisible} epId={this.props.match.params.id} refreshData={this.getData} title={this.state.experModalName} formData={this.state.formData} type={this.state.dialogType} handleCancel={this.handleCancel} />
                <Modal
                    title="发送该课程信息"
                    visible={this.state.sendCourseVisible}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="消息标题" {...formItemLayout}>
                                <Input value={this.state.title} onChange={this.changeTitle}/>
                            </FormItem>
                            <FormItem label="消息内容" {...formItemLayout}>
                                <TextArea value={this.state.content} onChange={this.changeContent} style={{width: 345}}/>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.sureSendMsg.bind(this)}>发布</Button>
                                <Button  style={{marginLeft: 10}} onClick={this.cancelSendMsg.bind(this)}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>


                <Modal
                    title="导入学生"
                    visible={this.state.studentVisible}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="学生模板" {...formItemLayout}>
                                <a onClick={()=> window.location = ("http://115.159.192.69:9000/class/课程关联学生导入模板.xls")}>模板下载</a>
                            </FormItem>
                            <FormItem label="文件地址" {...formItemLayout}>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload"/>选择文件
                                    </Button>
                                </Upload>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.upLoadStudent.bind(this)}>上传文件</Button>
                                <Button  style={{marginLeft: 10}} onClick={this.cancelStudent.bind(this)}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}
export default CourseInfo;