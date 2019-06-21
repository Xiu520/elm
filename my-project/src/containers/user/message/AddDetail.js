import React from "react";
import axios from "axios"

import {Icon} from "antd"
import Item from "_antd@3.16.3@antd/lib/list/Item";

import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from "../../../redux/action/index.js"//* as 表示导出所有的包

class AddDetail extends React.Component{
    constructor(){
        super();
        this.state={
            list:[],
            val:""
        }
    }
    componentDidMount(){
        if(this.props.data.Data.address){
            let val=this.props.data.Data.address
            if(val){
                this.setState({
                    val:val.name
                })
            }else{
                this.setState({
                    val:""
                })
            }
        }
        
    }
    Right(){
        if(this.detail.value){
            let keyword=this.detail.value
            axios.get("http://elm.cangdu.org/v1/pois?type=nearby&keyword="+keyword)
            .then((res)=>{
                if(res.data){
                    this.setState({
                        list:res.data
                    })
                }
            })
        }
        
    }
    Send(item){
        this.props.actions.send(item)
        this.props.history.push("/add")
    }
    goBack(){
        this.props.history.goBack()
    }
    render(){
        return(
            <div  className="box addDetail">
                <header>
                    <p><span onClick={this.goBack.bind(this)}> <i className="fa fa-fw fa-angle-left"></i></span> <span>搜索地址</span> </p>
                </header>
                <div className="center">
                    <div className="add-detail">
                        <input type="text" placeholder="小区/写字楼/学校等" defaultValue={this.state.val?(this.state.val):""} ref={(detail)=>this.detail=detail}/><button onClick={this.Right.bind(this)}>确认</button>
                    </div>
                    <div className="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
                    {
                        this.state.list.length?(
                            <ul className="list">
                                {
                                    this.state.list.map((item,index)=>{
                                        return(
                                            <li key={index} onClick={this.Send.bind(this,item)}>
                                                <p>{item.name}</p>
                                                <p>{item.address}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>)
                            :
                            (<div className="point">
                                <p>找不到地址？</p>
                                <p>请尝试输入小区、写字楼或学校名</p>
                                <p>详细地址（如门牌号）可稍后输入哦。</p>
                            </div>)
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        data:state
    }
}
function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(actions,dispatch)
    }
}
export default connect( 
    mapStateToProps,mapDispatchToProps
)(AddDetail)
