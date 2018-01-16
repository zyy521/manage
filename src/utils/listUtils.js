/**
 * Created by czw on 2018/1/14.
 */
import React from "react";
import axios from 'axios';
import {Select} from 'antd';

const Option = Select.Option;
export default (function () {
    // 课节列表
    let returnClassList =()=> {
        let optionList = [];
        for (let i =1;i <=12; i++) {
            optionList.push(<Option key={i} value={i}>{i}</Option>);
        }
        return optionList;
    };
    // 课节列表
    let returnWeekList =()=> {
        let optionList = [];
        for (let i =1;i <=7; i++) {
            let showText = "周" + i;
            if (i === 7) {
                showText = "周日";
            }
            optionList.push(<Option key={i} value={i}>{showText}</Option>);
        }
        return optionList;
    };

    return {
        returnClassList,
        returnWeekList
    };
}());
