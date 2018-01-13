/**
 * Created by czw on 2018/1/13.
 */
import React from 'react';
import moment from 'moment';
import { Form,Input,Row,Col,Select,DatePicker,Upload } from 'antd';

const FormItem = Form.Item;
class ExperForm extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.formData;
    }
    componentDidMount () {

    }
    render() {
        const state = this.state,
            formItemLayout = {
                labelCol: { span: 5 },
                wrapperCol: { span: 19 },
            };
        return (
            <Form>
                <FormItem {...formItemLayout}
                    label="实验课程">
                    <Input disabled defaultValue={state.courseName} />
                </FormItem>
                <FormItem {...formItemLayout}
                    label="实验名称">
                    <Input defaultValue={state.experName} />
                </FormItem>
                <FormItem {...formItemLayout}
                    label="实验时间">
                    <Row gutter={8}>
                        <Col span={4}>
                            <FormItem>
                                <Select defaultValue={state.day} />
                            </FormItem>
                        </Col>
                        <Col span={3}>
                            <FormItem>
                                <Select defaultValue={state.classStart} />
                            </FormItem>
                        </Col>
                        <Col span={3}>
                            <div className="text-center">节至</div>
                        </Col>
                        <Col span={3}>
                            <FormItem>
                                <Select defaultValue={state.classEnd} />
                            </FormItem>
                        </Col>
                        <Col span={3}>
                            节
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...formItemLayout}
                    label="实验地点">
                    <Select defaultValue={state.classroomId} />
                </FormItem>
                <FormItem {...formItemLayout}
                    label="上传报告时间">
                    <DatePicker defaultValue={moment(state.exportTime, 'YYYY-MM-DD')} style={{width: "100%"}} />
                </FormItem>
                <FormItem {...formItemLayout}
                    label="实验资料">
                    <div className="upload-box">
                        <Upload>
                            <Input addonAfter="上传资料" defaultValue={state.experDataLink} style={{width: "100%"}} disabled />
                        </Upload>
                    </div>
                </FormItem>
            </Form>
        )
    }
}
export default ExperForm;