import React from 'react';
import {Redirect} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import {Button, Card,Row,Col,Form, Tabs, Table,Input,Modal,message,Radio} from 'antd';
const RadioGroup = Radio.Group;

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
}

const modalWidth = 600;

class Subject extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logined: true,
            subjectVisible: false,
            subjectDatas: [],
            subjectDetailVisible: false,
            allSubjects: [],
            test: 1,
            "name":  "",
            "brief": "",
            "period": "",
            "reason": "",
            "applicant": "",
            "isCreate": true,
            "curseId": ""
        }
    }

    createSubject(){
        this.setState({
            subjectVisible: true
        });
    }

    handleCancel = (e) => {
        this.setState({
            subjectVisible: false,

        });
    }

    handleOk = (e) => {
        this.setState({
            subjectVisible: false,
        });
    }

    handleSubjectOk = (e) => {
        this.setState({
            subjectDetailVisible: false,
        });
    }

    handleSubjectCancel = (e) => {
        this.setState({
            subjectDetailVisible: false,
            test: 1,
            "name":  "",
            "brief": "",
            "period": "",
            "reason": "",
            "applicant": "",
        });
    }

    openSubjectDetail(record){
        this.setState({
            subjectDetailVisible: true,
            "name":  record.name,
            "brief": record.brief,
            "period": record.period,
            "reason": record.reason,
            "applicant": record.applicant,
            curseId: record.id
        })
    }

    sureCreateSubject(){

        if(!this.state.name){
            message.warning("请输入课程名称")
            return false;
        }else if(!this.state.brief){
            message.warning("请输入课程简介")
            return false;
        }else if(!this.state.period){
            message.warning("请输入课时")
            return false;
        }

        let obj = this;

        let source = obj.state.isCreate ? "/web/course/add" : "/web/course/modify";
        let params = {
            "name":  this.state.name,
            "brief": this.state.brief,
            "period": this.state.period,
            "test": this.state.test,
        };

        if(!obj.state.isCreate){
            params.id = this.state.curseId;
        }

        axios.post(source,params).then((res)=>{
            if(res.data && res.data.success){
                obj.state.isCreate ? message.success("课程创建成功") : message.success("课程修改成功")
                obj.fetchSubjects();
                obj.setState({
                    subjectVisible: false,
                    test: 1,
                    "name":  "",
                    "brief": "",
                    "period": "",
                    "reason": "",
                    "applicant": "",
                    isCreate: true,
                    curseId: ""
                })
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }
/*,{
    id: this.state.curseId,
    state: 2
}*/
    cancelSubject(){
        let obj = this;
        axios.post('/web/course/review/state?id='+ this.state.curseId + "&state=2" ).then((res)=>{
            if(res.data && res.data.success){
                obj.fetchReviewSubjects();
                obj.setState({
                    "name":  "",
                    "brief": "",
                    "period": "",
                    "reason": "",
                    "applicant": "",
                    "test": "",
                    subjectDetailVisible: false,
                    subjectVisible: false,
                    curseId: ""
                })
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    sureSubject(){
        let obj = this;
        axios.post('/web/course/review/state?id='+ this.state.curseId + "&state=1").then((res)=>{
            if(res.data && res.data.success){
                obj.fetchReviewSubjects();
                obj.setState({
                    "name":  "",
                    "brief": "",
                    "period": "",
                    "reason": "",
                    "applicant": "",
                    "test": "",
                    subjectDetailVisible: false,
                    subjectVisible: false,
                    curseId: ""
                })
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    fetchSubjects(){
        let obj = this;
        axios.get('/web/course/list').then((res)=>{
            if(res.data && res.data.success){
                obj.setState({
                    allSubjects: res.data.list
                })
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    fetchReviewSubjects(){
        let obj = this;
        axios.get('/web/course/review/list').then((res)=>{
            if(res.data && res.data.success){
                let subjects = [];
                res.data.list.map(function(item,index){
                    item.key = index + 1;
                    item.createDate = moment(item.createDate).format("YYYY-MM-DD HH:MM:SS");
                    subjects.push(item);
                })
                obj.setState({
                    reviewSubjects: subjects
                })
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    componentDidMount() {
        this.fetchSubjects();
    }

    callback = (key) =>{
        if(key === "1"){
            this.fetchSubjects();
            this.setState({
                selectType: "0"
            })
        }else if(key === "2"){
            this.fetchReviewSubjects();
            this.setState({
                selectType: "1"
            })
        }
    }

    onChange = (e) =>{
        this.setState({
            test: e.target.value
        })
    }

    changePeriod = (e) =>{
        this.setState({
            period: e.target.value
        })
    }

    changeBrief = (e) =>{
        this.setState({
            brief: e.target.value
        })
    }

    changeName = (e) =>{
        this.setState({
            name: e.target.value
        })
    }

    modify(record){
        this.setState({
            isCreate: false,
            "name":  record.name,
            "brief": record.brief,
            "period": record.period,
            "reason": record.reason,
            "applicant": record.applicant,
            "test": record.test,
            subjectVisible: true,
            curseId: record.id
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
                width: "10%"
            }, {
                title: '课程名称',
                dataIndex: 'name',
                key: 'name',
                width: "20%"
            }, {
                title: '申请人',
                dataIndex: 'applicant',
                key: 'applicant',
                width: "20%"
            }, {
                title: '申请时间',
                dataIndex: 'createDate',
                key: 'createDate',
                width: "20%"
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: "20%",
                render: (text) => (text === 0) ? "待审批" : "已审批"
            },
            {
                title: '操作',
                dataIndex: 'state',
                key: 'state',
                render: (text,record) => <a href="#" onClick={this.openSubjectDetail.bind(this,record)}>查看详情</a>,
            }
        ];

        const operations = <Button type="primary" className={this.state.selectType === "1" ? "labDetailhidden" : "labDetailVisible"} onClick={this.createSubject.bind(this)}>创建课程</Button>;

        const obj = this;
        return (
            <div className="gutter-example">
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations} onChange={this.callback}>
                    <TabPane tab="所有课程" key="1">
                        <div>
                            <Row gutter={24}>
                                {
                                    this.state.allSubjects.map(function (item, index) {
                                        return <Col span={6} style={{marginBottom: 20}} key={index + new Date().getTime()}>
                                            <Card title={item.name} extra={<a href="#" onClick={obj.modify.bind(obj,item) }>修改</a>}
                                                  style={{width: 250, height: 220}}>
                                                {item.brief}
                                            </Card>
                                        </Col>
                                    })
                                }

                            </Row>
                        </div>
                    </TabPane>
                    <TabPane tab="待审批课程" key="2">
                        <div>
                            <Table columns={columns} dataSource={this.state.reviewSubjects} rowKey="id"/>
                        </div>
                    </TabPane>
                </Tabs>

                <Modal
                    title={this.state.isCreate ? "创建课程": "修改课程" }
                    visible={this.state.subjectVisible}
                    onOk={this.handleOk}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                    maskClosable={false}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="课程名称" {...formItemLayout}>
                                <Input value={this.state.name} onChange={this.changeName} />
                            </FormItem>
                            <FormItem label="简介" {...formItemLayout}>
                                <TextArea value={this.state.brief} onChange={this.changeBrief}  style={{width: 345}}/>
                            </FormItem>
                            <FormItem label="课时" {...formItemLayout}>
                                <Input value={this.state.period} onChange={this.changePeriod} />
                            </FormItem>
                            <FormItem label="是否需要考试" {...formItemLayout}>
                                <RadioGroup onChange={this.onChange} value={this.state.test}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={0}>否</Radio>
                                </RadioGroup>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                {this.state.isCreate ? <Button type="primary" onClick={this.sureCreateSubject.bind(this)}>确认创建</Button> : <Button type="primary" onClick={this.sureCreateSubject.bind(this)}>确认修改</Button>}
                                <Button  style={{marginLeft: 10}} onClick={this.cancelSubject.bind(this)}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>

                <Modal
                    title="课程详情"
                    visible={this.state.subjectDetailVisible}
                    onOk={this.handleSubjectOk}
                    className="detailModal"
                    onCancel={this.handleSubjectCancel}
                    footer={false}
                    width={modalWidth}
                    maskClosable={false}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="课程名称" {...formItemLayout}>
                                <Input value={this.state.name} disabled/>
                            </FormItem>
                            <FormItem label="申请人" {...formItemLayout}>
                                <Input value={this.state.applicant} disabled/>
                            </FormItem>
                            <FormItem label="课程简介" {...formItemLayout}>
                                <TextArea value={this.state.brief}  style={{width: 345,height: 50}} disabled/>
                            </FormItem>
                            <FormItem label="申请理由" {...formItemLayout}>
                                <TextArea value={this.state.reason}  style={{width: 345,height: 50}} disabled/>
                            </FormItem>

                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.sureSubject.bind(this)}>同意</Button>
                                <Button  style={{marginLeft: 10}} onClick={this.cancelSubject.bind(this)}>拒绝</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>

            </div>
        )
    }
}

export default Subject;

