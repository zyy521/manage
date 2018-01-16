import React from 'react';
import { Redirect} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import { Modal,Row,Col,Form,Input,Tabs,Table,Button,message} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
}
const modalWidth = 600;

class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logined: true,
            announcementVisible: false,
            announcementDatas: [],
            messageDatas: [],
            selectType: "0",
            messageVisible: false
        }
    }

    announcements(){
        this.setState({
            announcementVisible: true
        });
    }

    handleCancel = (e) => {
        this.setState({
            announcementVisible: false,
            messageVisible: false
        });
    }

    handleOk = (e) => {
        this.setState({
            announcementVisible: false,
        });
    }

    sureAnnounce = (e) => {
        if(!this.state.title){
            message.warning("请输入公告标题")
            return false;
        }else if(!this.state.content){
            message.warning("请输入公告内容")
            return false;
        }

        const url = "/web/notice/send";
        let obj = this;
        axios.post(url + '?title=' + this.state.title +"&content=" + this.state.content).then((res)=>{
            if(res.data && res.data.success){
                message.success("公告发布成功！")
                obj.fetchNotice();
                obj.setState({
                    announcementVisible: false,
                });
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    cancelAnnounce = (e) => {
        this.setState({
            announcementVisible: false,
        });
    }


    componentDidMount() {
        this.fetchMsg();
    }

    fetchMsg(){
        const url = "/web/msg/list";
        let obj = this;
        axios.get(url+"?state=2&page=0").then((res)=>{
            if(res.data && res.data.success){
                let datas = [];

                res.data.list.map(function(item, index){
                    item.key = index + 1;
                    item.createdDate = moment(item.createdDate).format("YYYY-MM-DD HH:MM:SS")
                    datas.push(item);
                })
                obj.setState({
                    messageDatas: datas
                });
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    fetchNotice(){
        const url = "/web/notice/list";
        let obj = this;
        axios.get(url+"?page=0").then((res)=>{
            if(res.data && res.data.success){
                let datas = [];
                res.data.list.map(function(item, index){
                    item.key = index + 1;
                    item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:MM:SS")
                    datas.push(item);
                })
                obj.setState({
                    announcementDatas: datas
                });
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    callback = (key) =>{
        if(key === "1"){
            this.fetchMsg();
            this.setState({
                selectType: "0"
            })
        }else if(key === "2"){
            this.fetchNotice();
            this.setState({
                selectType: "1"
            })
        }
    }

    changeTitle = (e) => {
        this.setState({ title: e.target.value });
    }

    changeContent = (e) => {
        this.setState({ content: e.target.value });
    }

    openMessageDetail(record){
        this.setState({
            messageVisible: true ,

        });
        const url = "/web/msg/detail";
        let obj = this;
        axios.get(url+"?id=" + record.id).then((res)=>{
            if(res.data && res.data.success){
                let content = res.data.entity;
                obj.setState({
                    msgTitle: content.title,
                    msgContent: content.content,
                    sendUserName: record.sendUserName,
                    createdDate: moment(record.createdDate).format("YYYY-MM-DD HH:MM:SS"),
                });
                obj.fetchMsg();
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })

    }

    render() {
        if (!this.state.logined) {
            return (
                <Redirect to="/login"/>
            )
        }

        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
                width: "20%"
            }, {
                title: '消息标题',
                dataIndex: 'title',
                key: 'title',
                width: "20%"
            }, {
                title: '发布人',
                dataIndex: 'sendUserName',
                key: 'sendUserName',
                width: "20%"
            },{
                title: '状态',
                dataIndex: 'hasRead',
                key: 'hasRead',
                width: "20%",
                render: (text) => (text === 1) ? "已读" : "未读"
            },
            {
                title: '发布时间',
                dataIndex: 'createdDate',
                key: 'createdDate',
            }
        ];


        const announceMentColumns = [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
                width: "20%"
            }, {
                title: '公告标题',
                dataIndex: 'title',
                key: 'title',
                width: "20%"
            },  {
                title: '公告内容',
                dataIndex: 'content',
                key: 'content',
                width: "20%"
            }, {
                title: '发布人',
                dataIndex: 'createUserName',
                key: 'createUserName',
                width: "20%"
            },
            {
                title: '发布时间',
                dataIndex: 'createTime',
                key: 'createTime',
            }
        ];
        const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
        const operations = <Button className={this.state.selectType === "0" || loginInfo.type === 2? "labDetailhidden" : "labDetailVisible"} type="primary" onClick={this.announcements.bind(this)}>发布公告</Button>;
        return (
            <div className="gutter-example">
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations} onChange={this.callback}>
                    <TabPane tab="消息列表" key="1">
                        <div>
                            <Table columns={columns} dataSource={this.state.messageDatas} rowKey="key" onRowClick={this.openMessageDetail.bind(this)}/>
                        </div>
                    </TabPane>
                    <TabPane tab="公告列表" key="2">
                        <div>
                            <Table columns={announceMentColumns} dataSource={this.state.announcementDatas} rowKey="key"/>
                        </div>
                    </TabPane>
                </Tabs>

                <Modal
                    title="发布公告"
                    visible={this.state.announcementVisible}
                    onOk={this.handleOk}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="公告标题" {...formItemLayout}>
                                <Input value={this.state.title} onChange={this.changeTitle}/>
                            </FormItem>
                            <FormItem label="公告内容" {...formItemLayout}>
                                <TextArea value={this.state.content} onChange={this.changeContent} style={{width: 345}}/>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.sureAnnounce.bind(this)}>发布</Button>
                                <Button  style={{marginLeft: 10}} onClick={this.cancelAnnounce.bind(this)}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>

                <Modal
                    title="消息详情"
                    visible={this.state.messageVisible}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="消息标题" {...formItemLayout}>
                                <Input value={this.state.msgTitle} disabled/>
                            </FormItem>
                            <FormItem label="消息内容" {...formItemLayout}>
                                <TextArea value={this.state.msgContent} disabled style={{width: 345}}/>
                            </FormItem>
                            <FormItem label="发布人" {...formItemLayout}>
                                <Input value={this.state.sendUserName} disabled/>
                            </FormItem>

                            <FormItem label="发布时间" {...formItemLayout}>
                                <Input value={this.state.createdDate} disabled/>
                            </FormItem>
                        </Col>
                    </Row>
                </Modal>


            </div>
        )
    }
}
export default Message;
