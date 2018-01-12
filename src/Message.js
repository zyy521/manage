import React from 'react';
import { Redirect} from 'react-router-dom'
import { Modal,Row,Col,Form,Input,Tabs,Table,Button} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
}
const modalWidth = 600;
class Message extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logined: true,
            announcementVisible: false,
            announcementDatas: [],
            messageDatas: []
        }
    }

    announcements(){
        this.setState({
            announcementVisible: true
        });
    }

    handleCancel = (e) => {
        this.setState({
            announcementVisible: false,
        });
    }

    handleOk = (e) => {
        this.setState({
            announcementVisible: false,
        });
    }

    sureAnnounce = (e) => {
        this.setState({
            announcementVisible: false,
        });
    }

    cancelAnnounce = (e) => {
        this.setState({
            announcementVisible: false,
        });
    }


    componentDidMount() {
        this.setState({
            announcementDatas: [{
                key: '1',
                msgName: '公告1-1-1',
                fbr: 32,
                fbsj: '2017-12-11',
                state: 0
            }, {
                key: '2',
                msgName: '公告2-1-1',
                fbr: 32,
                fbsj: '2017-12-11',
                state: 0
            }, {
                key: '3',
                msgName: '公告3-1-1',
                fbr: 32,
                fbsj: '2017-12-11',
                state: 0
            }],

            messageDatas: [{
                key: '1',
                msgName: '消息1-1-1',
                fbr: 32,
                fbsj: '2017-12-11',
                state: 0
            }, {
                key: '2',
                msgName: '消息2-1-1',
                fbr: 32,
                fbsj: '2017-12-11',
                state: 0
            }, {
                key: '3',
                msgName: '消息3-1-1',
                fbr: 32,
                fbsj: '2017-12-11',
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
                title: '消息标题',
                dataIndex: 'msgName',
                key: 'msgName',
                width: "20%"
            }, {
                title: '发布人',
                dataIndex: 'fbr',
                key: 'fbr',
                width: "20%"
            },{
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: "20%",
                render: (text) => (text == "0") ? "未发送" : "待发送"
            },
            {
                title: '发布时间',
                dataIndex: 'fbsj',
                key: 'fbsj',
                width: "20%"
            }
        ];


        const announceMentColumns = [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
                width: "10%"
            }, {
                title: '公告标题',
                dataIndex: 'msgName',
                key: 'msgName',
                width: "20%"
            }, {
                title: '发布人',
                dataIndex: 'fbr',
                key: 'fbr',
                width: "20%"
            },{
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: "20%",
                render: (text) => (text == "0") ? "未发送" : "待发送"
            },
            {
                title: '发布时间',
                dataIndex: 'fbsj',
                key: 'fbsj',
                width: "20%"
            }
        ];

        const operations = <Button type="primary" onClick={this.announcements.bind(this)}>发布公告</Button>;

        return (
            <div className="gutter-example">
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations}>
                    <TabPane tab="消息列表" key="1">
                        <div>
                            <Table columns={columns} dataSource={this.state.messageDatas} rowKey="key"/>
                        </div>
                    </TabPane>
                    <TabPane tab="公告列表" key="2">
                        <div>
                            <Table columns={announceMentColumns} dataSource={this.state.announcementDatas} rowKey="key"/>
                        </div>
                    </TabPane>
                </Tabs>

                <Modal
                    title="发布公告"
                    visible={this.state.announcementVisible}
                    onOk={this.handleOk}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="公告标题" {...formItemLayout}>
                                <Input value="" />
                            </FormItem>
                            <FormItem label="公告内容" {...formItemLayout}>
                                <TextArea value=""  style={{width: 345}}/>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.sureAnnounce.bind(this)}>发布</Button>
                                <Button  style={{marginLeft: 10}} onClick={this.cancelAnnounce.bind(this)}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}
export default Message;