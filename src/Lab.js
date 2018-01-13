import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
};
const minHeight = window.innerHeight;
const modalWidth = 500;
const {Header, Content, Sider} = Layout;


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
            labDatas: []
        }
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

    sureAddLab() {

    }

    cancelAddLab() {

    }


    render() {
        return (

            <div className="gutter-example">
                <div>
                    <a>以下展示为</a>
                    <a>实验室的使用情况：</a>
                    <Button  style={{float:"right"}} type="primary" className="text-right"
                            onClick={this.addLab.bind(this)}>添加实验室</Button>
                    <br></br>
                </div>

                <br></br>
                <div>
                    <br></br>
                    <Row gutter={6}>
                        <Col span={6}>
                            <Card style={{
                                width: "200px",
                                height: "180px",
                                position: "relative",
                                left: "20px",
                                backgroundColor: "LawnGreen"
                            }}>
                                <p>3号楼1号机房</p>
                                <p>共100台机子</p>

                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{width: "200px", height: "180px", backgroundColor: "Yellow"}}>
                                <p>3号楼1号机房</p>
                                <p>共100台机子</p>

                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{width: "200px", height: "180px", backgroundColor: "Orange"}}>
                                <p>3号楼1号机房</p>
                                <p>共100台机子</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{width: "200px", height: "180px", backgroundColor: "Orange"}}>
                                <p>3号楼1号机房</p>
                                <p>共100台机子</p>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <br></br>
                <div>
                    <Row gutter={6}>
                        <Col span={6}>
                            <Card style={{
                                width: "200px",
                                height: "180px",
                                position: "relative",
                                left: "20px",
                                backgroundColor: "LawnGreen"
                            }}>
                                <p>3号楼1号机房</p>
                                <p>共100台机子</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{width: "200px", height: "180px", backgroundColor: ""}}>
                                <p>3号楼1号机房</p>
                                <p>共100台机子</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{width: "200px", height: "180px", backgroundColor: ""}}>
                                <p>3号楼1号机房</p>
                                <p>共100台机子</p>
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card style={{width: "200px", height: "180px", backgroundColor: ""}}>
                                <p>3号楼1号机房</p>
                                <p>共100台机子</p>
                            </Card>
                        </Col>
                    </Row>
                </div>

                <Modal
                    title="添加实验室"
                    visible={this.state.labVisible}
                    onOk={this.handleOk}
                    className="AddLabModel"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >

                    <Row>
                        <Col span={20}>
                            <FormItem label="实验室名称" {...formItemLayout}>
                                <Input value={this.state.labName}/>
                            </FormItem>
                            <FormItem label="实验室地点" {...formItemLayout} >
                                <Col span={4}>
                                <Input value={this.state.labAddress}/>
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
                                <Input value={this.state.labState}/>
                            </FormItem>
                            <FormItem label="简介" {...formItemLayout}>
                                <TextArea style={{width: 345}} value={this.state.labInfo}/>
                            </FormItem>
                            <div style={{textAlign: "center"}}>
                                <Button type="primary" onClick={this.sureAddLab.bind(this)}>确认添加</Button>
                                <Button style={{marginLeft: 10}} onClick={this.cancelAddLab.bind(this)}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>

                {/*实验室颜色框解释*/}

                <br></br>
                <div>

                    <hr></hr>
                    <Row gutter={6}>
                        <Col span={1}>
                            <Card style={{
                                width: "20px",
                                height: "18px",
                                position: "relative",
                                left: "20px",
                                backgroundColor: "LawnGreen"
                            }}>
                            </Card>
                        </Col>
                        <Col span={2}>
                            <a>空闲中</a>
                        </Col>
                        <Col span={1}>
                            <Card style={{
                                width: "20px",
                                height: "18px",
                                left: "20px",
                                backgroundColor: "Orange"
                            }}>
                            </Card>
                        </Col>
                        <Col span={2}>
                            <a>被占用</a>
                        </Col>

                        <Col span={1}>
                            <Card style={{
                                width: "20px",
                                height: "18px",
                                left: "20px",
                                backgroundColor: "Grey"
                            }}>
                            </Card>
                        </Col>
                        <Col span={2}>
                            <a>停用中</a>
                        </Col>

                    </Row>
                </div>
            </div>
        )

    }
}

export default Lab;

