/**
 * Created by czw on 2018/1/13.
 */
import React from 'react';
import moment from 'moment';
import { Form,Input,Row,Col,Select,DatePicker,Upload,Modal,message } from 'antd';
import axios from 'axios';
import listUtils from '../utils/listUtils';

const FormItem = Form.Item,
    Option = Select.Option;
class ExperForm extends React.Component {
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

    handleOk =()=> {
        console.log(this.props);
        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.epId = this.props.epId;
            let formData = new FormData();
            formData.append("file", this.file);
            for (let key in values) {
                formData.append(key, values[key]);
            }
            axios.post('/web/epRecord/add',formData).then((res)=>{
                const result = res.data;
                console.log(result);
                if (result.success) {
                    message.success('添加成功');
                    this.handleCancel();
                    this.props.refreshData();
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
    handleCancel =()=> {
        this.props.handleCancel();
    };

    // 上传前
    beforeUpload =(file)=> {
        this.setState({
            fileName :file.name
        });
        this.file = file;
        return false;
    };

    render() {
        const props = this.props,
            { getFieldDecorator } = this.props.form,
            formItemLayout = {
                labelCol: { span: 5 },
                wrapperCol: { span: 19 },
            },
            formData = props.formData,
            isDisabled = (props.type === "look");
        let courseOptionList = [],
            classroomOptionList = [];
        this.state.courseList.forEach(item => {
            courseOptionList.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
        });
        this.state.classroomList.forEach(item => {
            classroomOptionList.push(<Option key={item.id} value={item.id}>{item.buildingNumber}号楼{item.classroom}</Option>);
        });
        return (
            <Modal
                title={props.title}
                visible={props.visible}
                key={props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                okText="确认保存"
                cancelText="取消"
                wrapClassName={isDisabled ? "hide-ok-btn" : ""}
                >
                <Form>
                    <FormItem {...formItemLayout}
                        label="实验课程">
                        {getFieldDecorator('epCourseName', {
                            initialValue: formData.epCourseName,
                            rules: [{ required: true, message: '请输入课程名称!' }]
                        })(
                            <Input disabled />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label="实验名称">
                        {getFieldDecorator('epName', {
                            initialValue: formData.epName,
                            rules: [{ required: true, message: '请输入实验名称!' }]
                        })(
                            <Input disabled={isDisabled} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label="实验时间">
                        <Row gutter={8}>
                            <Col span={5}>
                                <FormItem>
                                    {getFieldDecorator('day', {
                                        initialValue: formData.day,
                                        rules: [{ required: true, message: '请选择实验时间!' }]
                                    })(
                                        <Select disabled={isDisabled}>
                                            {listUtils.returnWeekList()}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={5}>
                                <FormItem>
                                    {getFieldDecorator('classBegin', {
                                        initialValue: formData.classBegin,
                                        rules: [{ required: true, message: '请选择实验时间!' }]
                                    })(
                                        <Select disabled={isDisabled}>
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
                                    {getFieldDecorator('classEnd', {
                                        initialValue: formData.classEnd,
                                        rules: [{ required: true, message: '请选择实验时间!' }]
                                    })(
                                        <Select disabled={isDisabled}>
                                            {listUtils.returnClassList()}
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col span={3}>
                                节
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label="实验地点">
                        {getFieldDecorator('classroomId', {
                            initialValue: formData.classroomId,
                            rules: [{ required: true, message: '请选择实验地点!' }]
                        })(
                            <Select disabled={isDisabled}>
                                {classroomOptionList}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label="上传报告时间">
                        {getFieldDecorator('uploadEndTime', {
                            initialValue: formData.uploadEndTime ? moment(formData.uploadEndTime, 'YYYY-MM-DD') : null,
                            rules: [{ required: true, message: '请选择实验地点!' }]
                        })(
                            <DatePicker disabled={isDisabled} style={{width: "100%"}} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout}
                        label="实验资料">
                        <div className="upload-box">
                            <Upload action="/web/epRecord/add" beforeUpload={this.beforeUpload} disabled={isDisabled}>
                                {getFieldDecorator('epFileUrl', {
                                    initialValue: this.state.fileName ? this.state.fileName : formData.epFileUrl,
                                    rules: [{ required: true, message: '请选择实验资料!' }]
                                })(
                                    <Input addonAfter="上传资料" style={{width: "100%"}} disabled />
                                )}
                            </Upload>
                        </div>
                    </FormItem>
                </Form>
            </Modal>
        )
    }
}
export default ExperForm;