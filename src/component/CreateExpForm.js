/**
 * Created by czw on 2018/1/14.
 */
import React from 'react';
import moment from "moment";
import {Button, Form, Card, Col, Input, Layout, Modal, Row, Table, DatePicker,Select,message} from 'antd';
import axios from 'axios';
import listUtils from '../utils/listUtils';
const FormItem = Form.Item,
    { TextArea } = Input,
    Option = Select.Option;

class CreateExpForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            courseList: [],
            classroomList: []
        }
    }
    componentDidMount () {
        if(this.props.visible){
            this.getCourseList();
            this.getClassroomList();
        }
    };

    handleSubmit =()=> {
        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.tids = sessionStorage.getItem("userId");
            values.beginPeriod = moment(values.beginPeriod).format("YYYY-MM-DD");
            values.endPeriod = moment(values.endPeriod).format("YYYY-MM-DD");
            axios.post('/web/ep/add',values).then((res)=>{
                const result = res.data;
                if (result.success) {
                    message.success('添加成功');
                    this.handleCancel();
                    this.props.refreshList();
                } else {
                    Modal.error({
                        title: '提示',
                        content: result.errorMessage,
                    });
                }
            }).catch((err)=>{
                console.log(err.status);
            })
        });
    };

    getCourseList =()=> {
        axios.get('/web/course/list',{}).then((res)=>{
            this.setState({
                courseList: res.data.list ? res.data.list : []
            });
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    // 获取教室列表
    getClassroomList =()=> {
        axios.post('/web/classroom/query',{}).then((res)=>{
            this.setState({
                classroomList: res.data.list ? res.data.list : []
            });
        }).catch((err)=>{
            console.log(err.status);
        })
    };

    handleCancel =()=> {
        this.props.handleCancel();
    };

    render() {
        const { getFieldDecorator } = this.props.form,
            formItemLayout = {
                labelCol: { span: 5 },
                wrapperCol: { span: 19 },
            };
        let courseOptionList = [],
            classroomOptionList = [];
        this.state.courseList.forEach(item => {
            courseOptionList.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
        });
        this.state.classroomList.forEach(item => {
            classroomOptionList.push(<Option key={item.id} value={item.id}>{item.buildingNumber}号楼{item.classroom}</Option>);
        });
        return (
            <div>
                <Modal
                    title="创建实验课"
                    visible={this.props.visible}
                    key={this.props.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    okText="确认创建"
                    cancelText="取消"
                    >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="课程名称"
                            >
                            {getFieldDecorator('courseId', {
                                rules: [{ required: true, message: '请输入课程名称!' }]
                            })(
                                <Select>
                                    {courseOptionList}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="实验课名称"
                            >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入实验课名称!' }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="课程安排"
                            >
                            <Row gutter={8}>
                                <Col span={11}>
                                    <FormItem>
                                        {getFieldDecorator('beginPeriod', {
                                            rules: [{ type: 'object', required: true, message: '请选择课程安排时间!' }]
                                        })(
                                            <DatePicker format="YYYY-MM-DD" placeholder="请选择日期"/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={2}>
                                    <div className="text-center">至</div>
                                </Col>
                                <Col span={11}>
                                    <FormItem>
                                        {getFieldDecorator('endPeriod', {
                                            rules: [{ type: 'object', required: true, message: '请选择课程安排时间!' }]
                                        })(
                                            <DatePicker format="YYYY-MM-DD" placeholder="请选择日期"/>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="实验时间"
                            >
                            <Row gutter={8}>
                                <Col span={5}>
                                    <FormItem>
                                        {getFieldDecorator('day', {
                                            rules: [{ required: true, message: '请选择实验时间!' }]
                                        })(
                                            <Select>
                                                {listUtils.returnWeekList()}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={5}>
                                    <FormItem>
                                        {getFieldDecorator('classBegin', {
                                            rules: [{ required: true, message: '请选择实验时间!' }]
                                        })(
                                            <Select>
                                                {listUtils.returnClassList()}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={3}>
                                    <div className="text-center">节至</div>
                                </Col>
                                <Col span={5}>
                                    <FormItem>
                                        <FormItem>
                                            {getFieldDecorator('classEnd', {
                                                rules: [{ required: true, message: '请选择实验时间!' }]
                                            })(
                                                <Select>
                                                    {listUtils.returnClassList()}
                                                </Select>
                                            )}
                                        </FormItem>
                                    </FormItem>
                                </Col>
                                <Col span={3}>
                                    节
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="上课地点"
                            >
                            {getFieldDecorator('classroomId', {
                                rules: [{ required: true, message: '请选择上课地点!' }]
                            })(
                                <Select>
                                    {classroomOptionList}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="课程简介"
                            >
                            {getFieldDecorator('briefIntroduction', {})(
                                <TextArea style={{width: "100%"}} />
                            )}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default CreateExpForm;