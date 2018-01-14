/**
 * Created by czw on 2018/1/14.
 */
import React from 'react';
import {Button, Form, Card, Col, Input, Layout, Modal, Row, Table, DatePicker,Select,message, InputNumber} from 'antd';
import axios from 'axios';

const FormItem = Form.Item,
    { TextArea } = Input,
    Option = Select.Option;
class CreateExpForm extends React.Component {
    constructor(props){
        super(props)
    }

    handleSubmit =() => {
        let form = this.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            axios.post('/web/course/review/add',values).then((res)=>{
                const result = res.data;
                if (result.success) {
                    message.success('添加成功');
                    this.handleCancel();
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

    render() {
        const { getFieldDecorator } = this.props.form,
            formItemLayout = {
                labelCol: { span: 5 },
                wrapperCol: { span: 19 },
            };
        return (
            <div>
                <Modal
                    title="申请课程"
                    visible={this.props.visible}
                    key={this.props.visible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                    okText="确认申请"
                    cancelText="取消"
                    >
                    <Form>
                        <FormItem
                            {...formItemLayout}
                            label="课程名称"
                            >
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '请输入课程名称!' }]
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="课时"
                            >
                            {getFieldDecorator('period', {
                                rules: [{ required: true, message: '请输入课时!' }]
                            })(
                                <InputNumber style={{width: "100%"}} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="是否考核"
                            >
                            {getFieldDecorator('test', {
                                rules: [{ required: true, message: '请选择是否考核!' }]
                            })(
                                <Select>
                                    <Option value="1">是</Option>
                                    <Option value="0">否</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="课程简介"
                            >
                            {getFieldDecorator('brief', {
                                rules: [{ required: true, message: '请输入课程简介!' }]
                            })(
                                <TextArea style={{width: "100%"}} />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="申请理由"
                            >
                            {getFieldDecorator('reason', {
                                rules: [{ required: true, message: '请输入申请理由!' }]
                            })(
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