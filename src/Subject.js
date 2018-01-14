import React from 'react';
import {Redirect} from 'react-router-dom'
import {Button, Card,Row,Col,Form, Tabs, Table,Input,Modal} from 'antd';

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
            userName: "陈瑶琪",
            userNum: "2014329620037",
            subjectId: "1234",
            subjectName: "C语言",
            subjectInfo: "XXXXXXX",
            subjectDatas: [],
            subjectDetailVisible: false
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
        });
    }

    openSubjectDetail(record){
        this.setState({
            subjectDetailVisible: true,
        });

        console.log(record);
    }

    sureCreateSubject(){

    }

    cancelSubject(){

    }

    componentDidMount() {
        this.setState({
            subjectDatas: [{
                key: '1',
                curseName: '张山',
                sqr: 32,
                sqrsj: '2017-12-11',
                state: 0
            }, {
                key: '2',
                curseName: '张山2',
                sqr: "张三删",
                sqrsj: '2017-12-11',
                state: 0
            }, {
                key: '3',
                curseName: '张山3',
                sqr: "张三删",
                sqrsj: '2017-12-11',
                state: 0
            }]
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
                dataIndex: 'curseName',
                key: 'curseName',
                width: "20%"
            }, {
                title: '申请人',
                dataIndex: 'sqr',
                key: 'sqr',
                width: "20%"
            }, {
                title: '申请时间',
                dataIndex: 'sqrsj',
                key: 'sqrsj',
                width: "20%"
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: "20%",
                render: (text) => (text == "0") ? "待审批" : "已审批"
            },
            {
                title: '操作',
                dataIndex: 'state',
                key: 'state',
                render: (text,record) => <a href="#" onClick={this.openSubjectDetail.bind(this,record)}>查看详情</a>,
            }
        ];

        const operations = <Button type="primary" onClick={this.createSubject.bind(this)}>创建课程</Button>;

        return (
            <div className="gutter-example">
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                    <TabPane tab="所有课程" key="1">
                        <div>
                            <Row gutter={8}>
                                <Col span={6}>
                                    <Card title="C语言" extra={<a href="#">修改</a>}
                                          style={{width: 250, height: 220}}>
                                        这是简介
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card title="汇编" extra={<a href="#">修改</a>} style={{width: 250, height: 220}}>
                                        <p>这是简介</p>
                                        <p>这是简介</p>
                                        <p>这是简介</p>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card title="汇编" extra={<a href="#">修改</a>} style={{width: 250, height: 220}}>
                                        <p>这是简介</p>
                                        <p>这是简介</p>
                                        <p>这是简介</p>
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card title="汇编" extra={<a href="#">修改</a>}
                                          style={{width: 250, height: 220}}>
                                        <p>这是简介</p>
                                        <p>这是简介</p>
                                        <p>这是简介</p>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </TabPane>
                    <TabPane tab="待审批课程" key="2">
                        <div>
                            <Table columns={columns} dataSource={this.state.subjectDatas} rowKey="key"/>
                        </div>
                    </TabPane>
                </Tabs>

                <Modal
                    title="创建课程"
                    visible={this.state.subjectVisible}
                    onOk={this.handleOk}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="课程名称" {...formItemLayout}>
                                <Input value="" />
                            </FormItem>
                            <FormItem label="简介" {...formItemLayout}>
                                <TextArea value=""  style={{width: 345}}/>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.sureCreateSubject.bind(this)}>确认创建</Button>
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
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="课程名称" {...formItemLayout}>
                                <Input value="" />
                            </FormItem>
                            <FormItem label="申请人" {...formItemLayout}>
                                <Input value="" />
                            </FormItem>
                            <FormItem label="课程简介" {...formItemLayout}>
                                <TextArea value=""  style={{width: 345,height: 50}}/>
                            </FormItem>
                            <FormItem label="申请理由" {...formItemLayout}>
                                <TextArea value=""  style={{width: 345,height: 50}}/>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.sureCreateSubject.bind(this)}>同意</Button>
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

