import React from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom'
import {Button, Card, Col, Form, Input, Select, Modal, Row, message} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const {TextArea} = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
};
message.config({
    top: 10,
    duration: 0.5,
});

const modalWidth = 500;

const LabCreateForm = Form.create()(
    (props) => {
        const { labVisible, handleCancel, handleOk, form } = props;
        const { getFieldDecorator } = form;

        return (
            <Modal
            title="添加实验室"
            visible={labVisible}
            onOk={handleOk}
            className="AddLabModel"
            onCancel={handleCancel}
            width={modalWidth}
            maskClosable={false}
            okText="确认添加"
            cancelText="取消"
            style={{top: 20}}
        >
            <Row>
                <Col span={24}>
                    <Form>
                        <FormItem label="实验室地点" {...formItemLayout} >
                            <Col span={9}>
                                {getFieldDecorator('buildingNumber', {
                                    rules: [{ required: true, message: '请输入学校建筑楼号码 ' }],
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={3}>
                                号楼
                            </Col>
                            <Col span={9}>
                                {getFieldDecorator('classroom', {
                                    rules: [{ required: true, message: '请输入教室地点' }],
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={3}>
                                室
                            </Col>
                        </FormItem>
                        <FormItem label="管理员姓名" {...formItemLayout}>
                            {getFieldDecorator('principal', {
                                rules: [{ required: true, message: '请输入管理员姓名' }],
                            })(
                                <Input placeholder="请输入管理员姓名"/>
                            )}
                        </FormItem>
                        <FormItem label="机子数量" {...formItemLayout}>
                            {getFieldDecorator('capacity', {
                                rules: [{ required: true, message: '请输入机子数量' }],
                            })(
                                <Input placeholder="请输入机子数量"/>
                            )}
                        </FormItem>
                        <FormItem label="状态" {...formItemLayout}>
                            {getFieldDecorator('status', {
                                rules: [
                                    { required: false, message: '请选择状态' },
                                ],
                            })(
                            <Select initialValue="1" placeholder="请选择实验室状态">
                                <Option value="1">正常</Option>
                                <Option value="0">已停用</Option>
                            </Select>
                            )}
                        </FormItem>
                    </Form>
                </Col>
            </Row>
        </Modal>)
    }
);


class Lab extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logined: true,
            labVisible: false,
            userName: "陈瑶琪",
            userNum: "2014329620037",
            labId: "1234",
            labName: "C语言",
            labAddress: "3",
            labClassroom: "304",
            labTeacherId: "201701",
            labPcAmount: "100",
            labState: "0",
            labInfo: "XXXXXXX",
            labDatas: [],
            labDetailTitle: "",
            visible: false,
            labDetailDatas: [],
            hasDetail: false
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        let obj = this;
        axios.post('/web/classroom/query', {
            buildingNumber: "",
            classroom: "",
            status: ""
        }).then((res) => {
            if (res.data && res.data.success) {
                this.setState({
                    labDatas: res.data.list
                });
            } else if (res.data && res.data.code === "11111111") {
                message.error(res.data.errorMessage)
                obj.setState({
                    logined: false
                });
            } else {
                message.error(res.data.errorMessage)
            }
            console.log(res.data);
        }).catch((err) => {
            console.log(err.status);
        })
    }

    addLab = () => {
        this.setState({
            labVisible: true
        })
    }


    handleCancel = (e) => {
        this.setState({
            labVisible: false,
        });
    }

    handleSubmit = () =>{
        const form = this.form;
        let obj = this;
        form.validateFields((err, values) => {
            if (err) {
                return false;
            }
            axios.post('/web/classroom/add', values).then((res) => {
                if (res.data && res.data.success) {
                    message.success("添加实验室成功")
                    obj.fetchData();
                } else if (res.data && res.data.code === "11111111") {
                    message.error(res.data.errorMessage)
                    obj.setState({
                        logined: false
                    });
                } else {
                    message.error(res.data.errorMessage)
                }
            }).catch((err) => {
                console.log(err.status);
            })

            form.resetFields();
            this.setState({ labVisible: false });
        });
    }


    saveFormRef = (form) => {
        this.form = form;
    }

    openLabDetail =(item) =>{
        let obj = this;
        axios.get('/web/classroom/details?id=' + item.id).then((res) => {
            if (res.data && res.data.success) {
                obj.setState({
                    labDetailDatas: res.data.list,
                    visible: true,
                    labDetailTitle: item.buildingNumber + "号楼" + item.classroom + "号机房",
                    hasDetail: res.data.list.length === 0 ? false: true
                })

            } else if (res.data && res.data.code === "11111111") {
                message.error(res.data.errorMessage)
                obj.setState({
                    logined: false
                });
            } else {
                message.error(res.data.errorMessage)
            }
        }).catch((err) => {
            console.log(err.status);
        })
    }

    enableC = (item,e) => {
        e.stopPropagation();
        let obj = this;
        const params = item;
        params.status = (item.status === 0) ? 1 : 0;
        axios.post('/web/classroom/update',params).then((res) => {
            if (res.data && res.data.success) {
                message.success("更新实验室成功")
                obj.fetchData();
            } else if (res.data && res.data.code === "11111111") {
                message.error(res.data.errorMessage)
                obj.setState({
                    logined: false
                });
            } else {
                message.error(res.data.errorMessage)
            }
        }).catch((err) => {
            message.error(err.status);
        })
    }

    handleClose = ()=>{
        this.setState({
            visible: false
        })
    }

    render() {
        if (!this.state.logined) {
            return (
                <Redirect to="/login"/>
            )
        }

        let obj = this;
        return (
            <div className="gutter-example">
                <div className="labTop">

                    <Row gutter={24}>
                        <Col span={5}>
                            <a>以下展示为实验室的使用情况</a>
                        </Col>
                        <Col span={2}>
                            <a className="labSmallCard3"/>
                            <a>空闲中</a>
                        </Col>

                        <Col span={2}>
                            <a className="labSmallCard1"/>
                            <a>被占用</a>
                        </Col>

                        <Col span={2}>
                            <a className="labSmallCard2"/>
                            <a>停用中</a>
                        </Col>
                        <Col span={13}>
                            <Button type="primary" style={{float: "right"}}
                                    onClick={this.addLab}>添加实验室</Button>
                        </Col>

                    </Row>

                </div>
                <div>
                    <Row gutter={24}>
                        {
                            this.state.labDatas.map(function (item, index) {
                                return <Col span={6} style={{marginBottom: 20}} key={index + new Date().getTime()}>
                                    <Card onClick={obj.openLabDetail.bind(this,item)}
                                        className={item.status === 3 ? "labCard-1" : item.status === 1 ? "labCard-3" : "labCard-2"} >
                                        <h2>{item.buildingNumber + "号楼" + item.classroom + "号机房"}</h2>
                                        <p>共{item.capacity}台机子</p>
                                        <a onClick={obj.enableC.bind(this,item)} style={{float: "right"}}>{ item.status === 0 ? "起用" : item.status === 2 ? "" : "停用" }</a>
                                    </Card>
                                </Col>;
                            })
                        }
                    </Row>
                </div>
                <LabCreateForm
                    ref={this.saveFormRef}
                    handleOk={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    labVisible={this.state.labVisible}
                />

                <Modal
                    title={this.state.labDetailTitle}
                    visible={this.state.visible}
                    footer={false}
                    onCancel={this.handleClose}
                >
                    <div className={!this.state.hasDetail ? "labDetailhidden" : "labDetailVisible"}>
                        {
                            this.state.labDetailDatas.map((item) =>{
                                return <p>{"周" +item.day + "  第" + item.classBegin + "节至第" + item.classEnd
                                + "节  " + item.name}</p>
                            })
                        }
                    </div>

                    <div style={{height: 40}} className={!this.state.hasDetail ? "labDetailVisible" : "labDetailhidden"}>
                        无详细信息
                    </div>
                </Modal>
            </div>
        )

    }
}

export default Lab;

