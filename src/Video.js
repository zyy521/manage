import React from 'react';
import { Redirect} from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import {  Modal,Row,Col,Form,Input,Tabs,Table,Button,Upload,Icon,message,Checkbox} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
}
const modalWidth = 400;

class Video extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            logined: true,
            videoDatas: [],
            selectType: "0",
            fileVisible: false,
            fileList: [],
        }
    }



    handleCancel = (e) => {
        this.setState({
            fileVisible: false
        });
    }

    handleOk = (e) => {
        this.setState({
            fileVisible: false
        });
    }

    download(record){
        window.location.href = (record.fileUrl);
    }

    delete(record){
        const url = "/web/file/delete";
        let obj = this;
        axios.get(url + "?id=" + record.id).then((res)=>{
            if(res.data && res.data.success){
                message.success("删除成功")
                obj.fetchVideo();
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    componentDidMount() {
        this.fetchVideo();
    }

    fetchVideo(){
        const url = "/web/file/list";
        let obj = this;
        axios.get(url).then((res)=>{
            if(res.data && res.data.success){
                let datas = [];

                res.data.list.map(function(item, index){
                    item.key = index + 1;
                    item.uploadDate = moment(item.uploadDate).format("YYYY-MM-DD HH:MM:SS")
                    datas.push(item);
                })
                obj.setState({
                    videoDatas: datas
                });
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    upLoadVideo = (e) => {
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append('file', fileList[0]);
        formData.append('userType', 1);
        let obj = this;
        this.setState({
            uploading: true,
        });
        let config = {
            headers:{'Content-Type':'multipart/form-data'}
        };
        axios.post("/web/file/upload",formData,config).then((res)=>{
            if(res.data && res.data.success){
                message.success("上传成功");
                obj.setState({
                    fileList: [],
                    fileVisible: false
                });
                obj.fetchVideo();
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }



    cancelVideo = (e) => {
        this.setState({
            fileVisible: false,
        });
    }



    render() {
        if (!this.state.logined) {
            return (
                <Redirect to="/login"/>
            )
        }
        const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onRemove: (file) => {
                this.setState(({ fileList }) => {
                    const index = fileList.indexOf(file);
                    const newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
            multiple: false,
        };

        const columns = [
            {
                title: '序号',
                dataIndex: 'key',
                key: 'key',
                width: "20%"
            }, {
                title: '文件名称',
                dataIndex: 'name',
                key: 'name',
                width: "20%"
            }, {
                title: '上传者',
                dataIndex: 'idNumber',
                key: 'idNumber',
                width: "20%"
            },{
                title: '操作',
                dataIndex: 'createId',
                key: 'createId',
                render: (text,record) => <span><a href="#" style={{paddingRight: 10}} onClick={this.download.bind(this,record)}>下载</a><a  className={loginInfo.type === 2 ? "labDetailhidden": "labDetailShow"} href="#" onClick={this.delete.bind(this,record)} >删除</a></span>,
            }
        ];

        const operations = <Button type="primary" onClick={()=> this.setState({fileVisible: true})} className={loginInfo.type === 2 ? "labDetailhidden": "labDetailVisible"}>上传文件</Button>;
        return (
            <div className="gutter-example">
                <Tabs tabBarExtraContent={operations} onChange={this.callback}>
                    <TabPane tab="文件列表" key="1">
                        <div>
                            <Table columns={columns} dataSource={this.state.videoDatas} rowKey="key"/>
                        </div>
                    </TabPane>
                </Tabs>


                <Modal
                    title="导入文件"
                    visible={this.state.fileVisible}
                    onOk={this.handleOk}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="文件地址" {...formItemLayout}>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload"/>选择文件
                                    </Button>
                                </Upload>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.upLoadVideo.bind(this)}>上传文件</Button>
                                <Button  style={{marginLeft: 10}} onClick={this.cancelVideo.bind(this)}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}
export default Video;
