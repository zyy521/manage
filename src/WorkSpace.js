
import React from 'react';
import { Row,Col} from 'antd';

class WorkSpace extends React.Component {

    render() {
        return (

            <div className="gutter-example">
                <h2>待办事项</h2>
                <Row gutter={16}>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                            <h3>待审批的课程</h3>
                            <div className="gutter-box-div">
                                <a>计算机科学与技术1</a>
                            </div>
                            <div className="gutter-box-div">
                                <a>计算机科学与技术2</a>
                            </div>
                            <div className="gutter-box-div">
                                <a>计算机科学与技术3</a>
                            </div>
                            <div className="gutter-box-div">
                                <a>计算机科学与技术4</a>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                            <h3>待审批的报告</h3>
                            <div className="gutter-box-div">
                                <a>待审批的报告1</a>
                            </div>
                            <div className="gutter-box-div">
                                <a>待审批的报告1</a>
                            </div>
                            <div className="gutter-box-div">
                                <a>待审批的报告1</a>
                            </div>
                            <div className="gutter-box-div">
                                <a>待审批的报告1</a>
                            </div>
                        </div>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">
                            <h3>已发布的报告</h3>
                            <div className="gutter-box-div">
                                <a>已发布的报告</a>
                            </div>
                            <div className="gutter-box-div">
                                <a>已发布的报告</a>
                            </div>
                            <div className="gutter-box-div">
                                <a>已发布的报告</a>
                            </div>
                            <div className="gutter-box-div">
                                <a>已发布的报告</a>
                            </div>
                        </div>
                    </Col>
                </Row>

                <h2>便利贴</h2>
                <Row gutter={16}>
                    <Col className="gutter-row" span={5}>
                        <div className="gutter-box">

                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default WorkSpace;
