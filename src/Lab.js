import React from 'react';
import {Button, Card, Col, Form, Input, Layout, Modal, Row} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
};
const minHeight = window.innerHeight ;
const modalWidth = 866;
const {Header, Content, Sider} = Layout;


class Lab extends React.Component {

    addLab = (e) => {
        this.setState({
            dataVisible: true
        })
    }


    handleCancel = (e) => {
        this.setState({
            dataVisible: false,
        });
    }


    render() {
        return (

            <div className="gutter-example">
                <div>
                    <a>以下展示为</a>
                    <a>实验室的使用情况：</a>
                    <Button type="primary" style={{position: "relative", left: 850}}
                            onClick={this.addLab}>添加实验室</Button>
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


        return
        <Layout>
            <Modal
                title="添加实验室"
                visible={this.state.dataVisible}
                onOk={this.handleOk}
                className="AddLabModel"
                onCancel={this.handleCancel}
                footer={false}
                width={modalWidth}
            >

                <Row>
                    <Col span={8}>
                        <img className="imgPhoto" src="https://www.baidu.com/img/bd_logo1.png" width="50"
                             height="50"/>
                        <FormItem label="姓名" {...formItemLayout}>
                            <Input value={this.state.userName} disabled/>
                        </FormItem>
                        <FormItem label="学号" {...formItemLayout}>
                            <Input value={this.state.userNum} disabled/>
                        </FormItem>
                        <FormItem label="专业" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="班级" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="入学日期" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="籍贯" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="民族" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="出生日期" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="政治面貌" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="手机号码" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="邮箱" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                        <FormItem label="家庭住址" {...formItemLayout}>
                            <Input value="xxx" disabled/>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="简介" {...formItemLayout}>
                            <TextArea value="xxx" disabled/>
                        </FormItem>
                    </Col>
                </Row>
            </Modal>
        </Layout>

    }
}

export default Lab;

