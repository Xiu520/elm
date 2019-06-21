import React from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import {Icon} from "antd"

import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from "../../../redux/action/index.js"//* as 表示导出所有的包

class Address extends React.Component{
    constructor(){
        super();
        this.state={
            list:[],
            show:false
        }
    }
    componentDidMount(){
        let user_id=localStorage.getItem("user_id")
        axios
        .get('http://elm.cangdu.org/v1/users/'+user_id+'/addresses')
        .then((res)=>{
            if(res.data){
                let arr=res.data
                this.setState({
                    list:arr.reverse()
                })
            }
        })
    }
    goBack(){
        this.props.history.push("/message")
    }
    edit(){
        this.setState({
            show:true
        })
    }
    success(){
        this.setState({
            show:false
        }) 
    }
    del(item){
        let id=item.id
        let user_id=localStorage.getItem("user_id")
        axios
        .delete("http://elm.cangdu.org/v1/users/"+user_id+"/addresses/"+id)
        .then((res)=>{
            axios
            .get('http://elm.cangdu.org/v1/users/'+user_id+'/addresses')
            .then((res)=>{
                if(res.data){
                let arr=res.data
                    this.setState({
                        list:arr.reverse()
                    })
                }
            })
        })
    }
    render(){
        return(
            <div  className="box address">
                <header>
                    <p>
                        <span onClick={this.goBack.bind(this)}> <i className="fa fa-fw fa-angle-left"></i></span> <span>编辑地址</span> 
                        {
                            this.state.show?( <span onClick={this.success.bind(this)}>完成</span>):(<span onClick={this.edit.bind(this)}>编辑</span>)
                        }
                       
                    </p>
                </header>
                <ul className="list">
                {
                    this.state.list.map((item,index)=>{
                        return(
                            <li key={index}>
                                <p>{item.address}</p>
                                <p>{item.phone}</p>
                                {
                                    this.state.show?(<span onClick={this.del.bind(this,item)}><Icon type="close" /></span>):""
                                }
                                
                            </li>
                        )
                    })
                }
                    
                </ul>
                <ul className="from">
                    <li className="where">
                        <Link to="/add">
                            <span>新增地址</span>
                            <span className="right"><Icon type="right" /></span>
                        </Link>
                    </li>
                </ul>
                
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
)(Address)
