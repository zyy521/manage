import React from 'react';
import axios from 'axios';
import { Row,Col,message,Card} from 'antd';
class WorkSpace extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            logined: true,
            reviewSubjects: [],
            announcementDatas: [],
            messageDatas: [],
        }
    }
    componentDidMount() {
        this.fetchReviewSubjects();
        this.fetchNotice();
        this.fetchMsg();
    }

    fetchMsg(){
        const url = "/web/msg/list";
        let obj = this;
        axios.get(url+"?state=0&page=0").then((res)=>{
            if(res.data && res.data.success){
                obj.setState({
                    messageDatas: res.data.list
                });
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }

    fetchNotice(){
        const url = "/web/notice/list";
        let obj = this;
        axios.get(url+"?page=0").then((res)=>{
            if(res.data && res.data.success){
                obj.setState({
                    announcementDatas: res.data.list
                });
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }
    fetchReviewSubjects(){
        let obj = this;
        axios.get('/web/course/review/list').then((res)=>{
            if(res.data && res.data.success){
                obj.setState({
                    reviewSubjects: res.data.list.length < 6 ? res.data.list : res.data.list.slice(0,5)
                })
            }else{
                message.error(res.data.errorMessage)
            }
        }).catch((err)=>{
            console.log(err.status);
        })
    }


    render() {
        const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"));
        return (
            <div className="gutter-example workSpaceLists">
                <h2>待办事项</h2>
                <Row gutter={16}>
                    <Col span={6} style={{marginBottom: 20}} className={loginInfo.type === 2 ? "labDetailhidden": "labDetailVisible"}>
                        <Card title='待审批的课程' style={{width: 250, height: 220}}>
                            {
                                this.state.reviewSubjects.map(function (item) {
                                    return <div className="worksItems"><a>{item.name}</a></div>
                                })
                            }
                        </Card>
                    </Col>

                    <Col span={6} style={{marginBottom: 20}} className={loginInfo.type === 2 ? "labDetailhidden": "labDetailVisible"}>
                        <Card title='待批阅的报告' style={{width: 250, height: 220}}>

                        </Card>
                    </Col>

                    <Col span={6} style={{marginBottom: 20}} className={loginInfo.type === 2 ? "labDetailhidden": "labDetailVisible"}>
                        <Card title='已发布的公告' style={{width: 250, height: 220}}>
                            {
                                this.state.announcementDatas.map(function (item) {
                                    return <div className="worksItems"><a>{item.title}</a></div>
                                })
                            }
                        </Card>
                    </Col>

                    <Col span={6} style={{marginBottom: 20}} className={loginInfo.type === 2 ? "labDetailVisible": "labDetailhidden"}>
                        <Card title='待阅读的公告' style={{width: 250, height: 220}}>
                            {
                                this.state.announcementDatas.map(function (item) {
                                    return <div className="worksItems"><a>{item.title}</a></div>
                                })
                            }
                        </Card>
                    </Col>

                    <Col span={6} style={{marginBottom: 20}}  className={loginInfo.type === 2 ? "labDetailVisible": "labDetailhidden"}>
                        <Card title='待阅读的消息' style={{width: 250, height: 220}}>
                            {
                                this.state.messageDatas.map(function (item) {
                                    return <div className="worksItems"><a>{item.name}</a></div>
                                })
                            }
                        </Card>
                    </Col>
                </Row>

               {/* <h2>便利贴</h2>
                <Row gutter={18}>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                            <a>删除</a>
                            <p>便利贴</p>
                        </div>
                    </Col>
                    </Row>*/}
                </div>
        )
    }

}

export default WorkSpace;
