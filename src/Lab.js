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
const modalWidth = 500;

const labCreateForm = Form.create()(
    (props) => {
        const { labVisible, handleCancel, handleOk, form } = props;
        const { getFieldDecorator } = form;
        return (<Modal
            title="添加实验室"
            visible={labVisible}
            onOk={handleOk}
            className="AddLabModel"
            onCancel={handleCancel}
            footer={false}
            width={modalWidth}
            style={{top: 20}}
        >
            <Row>
                <Col span={20}>
                    <Form>
                        <FormItem label="实验室地点" {...formItemLayout} >
                            <Col span={4}>
                                {getFieldDecorator('buildingNumber', {
                                    rules: [{ required: true, message: '请输入实验楼地点' }],
                                })(
                                    <Input value={this.state.buildingNumber}/>
                                )}
                            </Col>
                            <Col span={3}>
                                号楼
                            </Col>
                            <Col span={4}>
                                <Input value={this.state.labClassroom}/>
                            </Col>
                            <Col span={4}>
                                室
                            </Col>
                        </FormItem>
                        <FormItem label="管理员姓名" {...formItemLayout}>
                            <Input value={this.state.labTeacherId}/>
                        </FormItem>
                        <FormItem label="机子数量" {...formItemLayout}>
                            <Input value={this.state.labPcAmount}/>
                        </FormItem>
                        <FormItem label="状态" {...formItemLayout}>
                            <Select defaultValue="1">
                                <Option value="1">空闲中</Option>
                                <Option value="2">被占用</Option>
                                <Option value="3">已停用</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="简介" {...formItemLayout}>
                            <TextArea style={{width: 345,height: 40}} value={this.state.labInfo}/>
                        </FormItem>
                        <div style={{textAlign: "center"}}>
                            <Button type="primary" onClick={this.sureAddLab.bind(this)}>确认添加</Button>
                            <Button style={{marginLeft: 10}} onClick={this.cancelAddLab.bind(this)}>取消</Button>
                        </div>
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
        }
    }

    componentDidMount() {
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

    addLab = (e) => {
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

        form.validateFields((err, values) => {
            if (err) {
                return false;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ labVisible: false });
        });
    }

    sureAddLab() {

    }

    cancelAddLab() {

    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        if (!this.state.logined) {
            return (
                <Redirect to="/login"/>
            )
        }

        const { getFieldDecorator } = this.props.form;
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
                                    onClick={this.addLab.bind(this)}>添加实验室</Button>
                        </Col>

                    </Row>

                </div>
                <div>
                    <Row gutter={24}>
                        {
                            this.state.labDatas.map(function (item) {
                                return <Col span={6} style={{marginBottom: 20}}> <Card
                                    title={item.buildingNumber + "号楼" + item.classroom + "号机房"}
                                    className={item.status === 3 ? "labCard-1" : item.status === 0 ? "labCard-3" : "labCard-2"}>
                                    <p>共{item.capacity}台机子</p>
                                </Card></Col>;
                            })
                        }
                    </Row>
                </div>

                <labCreateForm
                    ref={this.saveFormRef}
                    handleOk={this.handleSubmit}
                    handleCancel={this.handleCancel}
                    labVisible={this.state.labVisible}
                />

            </div>
        )

    }
}

export default Lab;

