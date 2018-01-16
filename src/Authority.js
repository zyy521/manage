import React from 'react';
import { Redirect} from 'react-router-dom'
import axios from 'axios';
import { Modal,Row,Col,Form,Input,Tabs,Table,Button,Upload,Icon,message,Checkbox} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const { TextArea } = Input;
const confirm = Modal.confirm;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 15},
}
const modalWidth = 600;
class Authority extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            logined: true,
            teacherVisible: false,
            studentVisible: false,
            tecaherDatas: [],
            studentsRuleDatas: [],
            teachersRuleDatas: [],
            fileList: [],
            selectType: 0
        }
    }

    cancelTeacher = (e) => {
        this.setState({
            teacherVisible: false,

        });
    }

    handleCancel = (e) => {
        this.setState({
            teacherVisible: false,
            studentVisible: false,
        });
    }

    handleOk = (e) => {
        this.setState({
            teacherVisible: false,
            studentVisible: false,
        });
    }

    cancelStudent = (e) => {
        this.setState({
            studentVisible: false,
        });
    }

    upLoadTeacher = (e) => {
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
        axios.post("/web/user/importUser",formData,config).then((res)=>{
            if(res.data && res.data.success){
                message.success("上传成功");
                obj.setState({
                    fileList: []
                });
                obj.fetchTeacherRules();
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }


    upLoadStudent = (e) => {
        let obj = this;
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append('file', fileList[0]);
        formData.append('userType', 2);

        this.setState({
            uploading: true,
        });
        let config = {
            headers:{'Content-Type':'multipart/form-data'}
        };
        axios.post("/web/user/importUser",formData,config).then((res)=>{
            if(res.data && res.data.success){
                message.success("上传成功");
                obj.setState({
                    fileList: [],
                    studentVisible: false
                });
                obj.fetchStudentsRules();
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }



    fetchTeacher(){
        let obj = this;
        axios.get('/web/user/teacher?page=0').then((res)=>{
            if(res.data && res.data.success){
                obj.setState({
                    tecaherDatas: res.data.entity
                })
            }else{
                message.error(res.data.errorMessage)
            }
            console.log(res.data);
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    fetchTeacherRules(){
        let obj = this;
        axios.get('/web/user/list?page=&type=0').then((res)=>{
            if(res.data && res.data.success){
                obj.setState({
                    teachersRuleDatas: res.data.entity.list
                })
            }else{
                message.error(res.data.errorMessage)
            }
            console.log(res.data);
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    fetchStudentsRules(){
        let obj = this;
        axios.get('/web/user/list?page=&type=2').then((res)=>{
            if(res.data && res.data.success){
                obj.setState({
                    studentsRuleDatas: res.data.entity.list
                })
            }else{
                message.error(res.data.errorMessage)
            }
            console.log(res.data);
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    componentDidMount() {
        this.fetchTeacher();
    }



    importTeacher=() =>{
        this.setState({
            teacherVisible: true
        })

    }

    importStudent=() =>{
        this.setState({
            studentVisible: true
        })
    }

    removeTeacher(record){
        let obj = this;
        confirm({
            title: '确定删除?',
            content: '确定删除角色'  + record.name +"?",
            okText: '确认',
            okType: 'primary',
            cancelText: '放弃',
            onOk() {
                axios.get('/web/user/delete?idNumber=' + record.idNumber).then((res)=>{
                    if(res.data && res.data.success){
                        message.success("删除成功")
                        obj.fetchTeacher();
                        obj.setState({
                            teacherVisible: false
                        })
                    }else{
                        message.error(res.data.errorMessage)
                    }
                }).catch((err)=> {
                    console.log(err.status);
                })
            },
            onCancel() {
                obj.setState({
                    teacherVisible: false
                })
            },
        });
    }

    removeTeacherRule(record){
        let obj = this;
        confirm({
            title: '确定删除?',
            content: '确定删除角色'  + record.name +"?",
            okText: '确认',
            okType: 'primary',
            cancelText: '放弃',
            onOk() {
                axios.get('/web/user/delete?idNumber=' + record.idNumber).then((res)=>{
                    if(res.data && res.data.success){
                        message.success("角色删除成功")
                        obj.fetchTeacherRules()
                    }else{
                        message.error(res.data.errorMessage)
                    }
                }).catch((err)=> {
                    console.log(err.status);
                })
            },
            onCancel() {
                obj.setState({
                    teacherVisible: false
                })
            },
        });
    }

    removeStudentRule(record){
        let obj = this;
        confirm({
            title: '确定删除?',
            content: '确定删除角色'  + record.name +"?",
            okText: '确认',
            okType: 'primary',
            cancelText: '放弃',
            onOk() {
                axios.get('/web/user/delete?idNumber=' + record.idNumber).then((res)=>{
                    if(res.data && res.data.success){
                        message.success("角色删除成功")
                        obj.fetchStudentsRules();
                    }else{
                        message.error(res.data.errorMessage)
                    }
                }).catch((err)=> {
                    console.log(err.status);
                })
            },
            onCancel() {
                obj.setState({
                    teacherVisible: false
                })
            },
        });
    }

    callback = (key) =>{
        if(key === "1"){
            this.fetchTeacher();
            this.setState({
                selectType: "0"
            })
        }else if(key === "2"){
            this.fetchTeacherRules();
            this.setState({
                selectType: "1"
            })
        }else{
            this.fetchStudentsRules();
            this.setState({
                selectType: "2"
            })
        }
    }

    modifyInfo(whichOne,modifyValue,record){
        let authority = record.authority;
        let changeValue = "";
        let one = "0";
        let two = "0";
        let three = "0";
        let four = "0";
        let obj = this;
        //课程
        if(whichOne === 0){
            one = modifyValue ?  "1" : "0" ;
            changeValue = one + authority.substr(1,3);
        }else if(whichOne === 1){
            two = modifyValue ?  "1" : "0" ;

            changeValue = authority.substr(0,1) + two + authority.substr(2,2);
        }else if(whichOne === 2){
            three = modifyValue ?  "1" : "0" ;
            changeValue = authority.substr(0,2) + three + authority.substr(3,1);
        }else if(whichOne === 3){
            four = modifyValue ?  "1" : "0" ;
            changeValue = authority.substr(0,3) + four;
        }

        axios.get('/web/user/auth?userId=' + record.id + "&auth=" + changeValue.toString()).then((res)=>{
            if(res.data && res.data.success){
                message.success("权限更新成功")
                obj.fetchTeacher();
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=> {
            console.log(err.status);
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
                title: '工号',
                dataIndex: 'idNumber',
                key: 'idNumber',
                width: "10%"
            }, {
                title: '角色',
                dataIndex: 'type',
                key: 'type',
                width: "12%",
                render: (text) => (text === 0 || text === 1) ? "老师" : "学生"
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: "12%"
            },{
                title: '课程',
                dataIndex: 'authority',
                key: 'authority',
                width: "13%",
                render: (text,record) => <Checkbox onClick={this.modifyInfo.bind(this,0,(record.authority.substr(0,1) === "0") ? true : false,record)} checked={(record.authority.substr(0,1) === "0") ? false : true}/>
            },
            {
                title: '实验室',
                dataIndex: 'authority',
                key: 'authority',
                width: "13%",
                render: (text,record) => <Checkbox onClick={this.modifyInfo.bind(this,1 ,(record.authority.substr(1,1) === "0") ? true : false,record)} checked={(record.authority.substr(1,1) === "0") ? false : true}/>
            },
            {
                title: '资料',
                dataIndex: 'authority',
                key: 'authority',
                width: "13%",
                render: (text,record) => <Checkbox onClick={this.modifyInfo.bind(this,2,(record.authority.substr(2,1) === "0") ? true : false,record)} checked={(record.authority.substr(2,1) === "0") ? false : true}/>
            },
            {
                title: "公告",
                dataIndex: 'authority',
                key: 'authority',
                width: "13%",
                render: (text,record) => <Checkbox onClick={this.modifyInfo.bind(this,3,(record.authority.substr(3,1) === "0") ? true : false,record)} checked={(record.authority.substr(3,1) === "0") ? false : true}/>
            },
            {
                title: '操作',
                dataIndex: 'authority',
                key: 'authority',
                render: (text,record) =>  <a onClick={this.removeTeacher.bind(this,record)}>删除</a>

            },
        ];

        const teacherColumns = [
            {
                title: '工号',
                dataIndex: 'idNumber',
                key: 'idNumber',
                width: "20%"
            }, {
                title: '角色',
                dataIndex: 'type',
                key: 'type',
                width: "30%",
                render: (text) => (text === 2) ? "学生" : "老师"
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: "30%"
            },{
                title: '操作',
                dataIndex: 'type',
                key: 'type',
                render: (text,record) =>  <a onClick={this.removeTeacherRule.bind(this,record)}>删除</a>
            }
        ];

        const studentColumns = [
            {
                title: '学号',
                dataIndex: 'idNumber',
                key: 'idNumber',
                width: "20%"
            }, {
                title: '角色',
                dataIndex: 'type',
                key: 'type',
                width: "30%",
                render: (text) => (text === 2) ? "学生" : "老师"
            }, {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: "30%"
            },{
                title: '操作',
                dataIndex: 'type',
                key: 'type',
                render: (text,record) =>  <a onClick={this.removeStudentRule.bind(this,record)}>删除</a>
            }
        ];

        const operations = <div className={this.state.selectType === "0" ? "labDetailhidden" : "labDetailVisible"}>
            <Button type="primary" className={this.state.selectType === "1" ? "labDetailVisible" : "labDetailhidden"} style={{paddingRight: 10}} onClick={this.importTeacher}>导入教师</Button>
            <Button type="primary" className={this.state.selectType === "2" ? "labDetailVisible" : "labDetailhidden"}  onClick={this.importStudent}>导入学生</Button>
        </div>;
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
                const isXls = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';
                if (!isXls) {
                    message.error('请选择.xls或者.xlsx结尾的文件上传!');
                    return false;
                }

                this.setState(({ fileList }) => ({
                    fileList: [...fileList, file],
                }));
                return false;
            },
            fileList: this.state.fileList,
            multiple: false,
        };

        return (
            <div className="gutter-example">
                <Tabs defaultActiveKey="1" tabBarExtraContent={operations} onChange={this.callback}>
                    <TabPane tab="权限设置" key="1">
                        <div>
                            <Table columns={columns} dataSource={this.state.tecaherDatas} rowKey="key"/>
                        </div>
                    </TabPane>
                    <TabPane tab="角色列表(老师)" key="2">
                        <div>
                            <Table columns={teacherColumns} dataSource={this.state.teachersRuleDatas} rowKey="key"/>
                        </div>
                    </TabPane>

                    <TabPane tab="角色列表(学生)" key="3">
                        <div>
                            <Table columns={studentColumns} dataSource={this.state.studentsRuleDatas} rowKey="key"/>
                        </div>
                    </TabPane>
                </Tabs>

                <Modal
                    title="导入教师角色"
                    visible={this.state.teacherVisible}
                    onOk={this.handleOk}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="角色信息" {...formItemLayout}>
                                <a onClick={()=> window.open("http://115.159.192.69:9000/class/老师导入模板.xls")}>模板下载</a>
                            </FormItem>
                            <FormItem label="文件地址" {...formItemLayout}>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload"/>选择文件
                                    </Button>
                                </Upload>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.upLoadTeacher.bind(this)}>上传文件</Button>
                                <Button  style={{marginLeft: 10}} onClick={this.cancelTeacher.bind(this)}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>

                <Modal
                    title="导入学生角色"
                    visible={this.state.studentVisible}
                    onOk={this.handleOk}
                    className="detailModal"
                    onCancel={this.handleCancel}
                    footer={false}
                    width={modalWidth}
                >
                    <Row>
                        <Col span={24}>
                            <FormItem label="角色信息" {...formItemLayout}>
                                <a onClick={()=> window.open("http://115.159.192.69:9000/class/学生导入模板.xls")}>模板下载</a>
                            </FormItem>
                            <FormItem label="文件地址" {...formItemLayout}>
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload"/>选择文件
                                    </Button>
                                </Upload>
                            </FormItem>
                            <div style={{ textAlign: "center"}}>
                                <Button type="primary" onClick={this.upLoadStudent.bind(this)}>上传文件</Button>
                                <Button  style={{marginLeft: 10}} onClick={this.cancelStudent.bind(this)}>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

export default Authority;
