import React from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import {Icon} from "antd"

import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from "../../../redux/action/index.js"//* as 表示导出所有的包

class Add extends React.Component{
    constructor(){
        super();
        this.state={
            show:false
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
    goBack(){
        this.props.history.goBack()
    }
    Uname(e){
        if(e.target.value===""){
            this.setState({
                warnName:"请输入您的姓名"
            })
        }else{
            this.setState({
                warnName:""
            })
        }
    }
    Address(e){
        if(e.target.value.length<3){
            this.setState({
                warnAddress:"送餐地址太短了，不能辨识"
            })
        }else{
            this.setState({
                warnAddress:""
            })
        }
        if(e.target.value.length>0){
            this.setState({
                show:true
            })
        }else{
            this.setState({
                show:false
            })
        }
    }
    Tel(e){
        let telBool=/^1[3456789]\d{9}$/.test(e.target.value);
        if(e.target.value===""){
            this.setState({
                warnTel:"手机号不能为空",
                show:false
            })
        }else if(!telBool){
            this.setState({
                warnTel:"请输入正确的手机号",
                show:false
            })
        }else{
            this.setState({
                warnTel:"",
                show:true
            })
        }
        
    }
    Xtel(e){
        let telBool=/^1[3456789]\d{9}$/.test(e.target.value);
        if(!telBool&&e.target.value.length>0){
            this.setState({
                warnXtel:"请输入正确的手机号"
            })
        }else{
            this.setState({
                warnXtel:""
            })
        }
    }
    NewAddress(){
        let user_id=localStorage.getItem("user_id")
        let val=this.props.data.Data.address.name
        if(this.uname.value&&this.address.value&&this.tel.value){ 
            let data={address:this.address.value,geohash:"31.22299,121.36025",name:this.uname.value,phone:this.tel.value,poi_type: 0,sex: 1,tag: "公司",tag_type: 4,phone_bk:this.xtel.value,address_detail:val};
            axios
            .post('http://elm.cangdu.org/v1/users/'+user_id+'/addresses',data)
            .then((res)=>{
                this.props.history.push('/address');
            })
        }  
    }
    render(){
        return(
            <div  className="box add">
                <header>
                    <p><span onClick={this.goBack.bind(this)}> <i className="fa fa-fw fa-angle-left"></i></span> <span>新增地址</span> </p>
                </header>
                <ul className="from1">
                    {this.state.warnName?
                        (<li className="warn">
                            <input type="text" placeholder="请填写您的姓名" onChange={this.Uname.bind(this)} />
                            <p>{this.state.warnName}</p>
                        </li>)
                        :
                        (<li>
                            <input type="text" placeholder="请填写您的姓名" onChange={this.Uname.bind(this)} ref={(uname)=>{this.uname=uname}}/>
                        </li>)
                    }
                    
                    <li>
                        <Link to="/addDetail"><input type="text" placeholder="小区/写字楼/学校等" defaultValue={this.state.val?(this.state.val):""}/></Link>
                    </li>
                    {this.state.warnAddress?
                        (<li className="warn">
                           <input type="text" placeholder="请填写详细送餐地址" onChange={this.Address.bind(this)} />
                            <p>{this.state.warnAddress}</p>
                        </li>)
                        :
                        (<li>
                            <input type="text" placeholder="请填写详细送餐地址" onChange={this.Address.bind(this)} ref={(address)=>{this.address=address}}/>
                        </li>)
                    }
                    {this.state.warnTel?
                        (<li className="warn">
                           <input type="text" placeholder="请填写能够联系到您的手机号"  onChange={this.Tel.bind(this)} />
                            <p>{this.state.warnTel}</p>
                        </li>)
                        :
                        (<li>
                            <input type="text" placeholder="请填写能够联系到您的手机号" onChange={this.Tel.bind(this)} ref={(tel)=>{this.tel=tel}}/>
                        </li>)
                    }
                    {this.state.warnXtel?
                        (<li className="warn">
                           <input type="text" placeholder="备用联系电话（选填）"  onChange={this.Xtel.bind(this)} />
                            <p>{this.state.warnXtel}</p>
                        </li>)
                        :
                        (<li>
                            <input type="text" placeholder="备用联系电话（选填）" onChange={this.Xtel.bind(this)} ref={(xtel)=>{this.xtel=xtel}}/>
                        </li>)
                    }
                </ul>
                <div className="red">
                    {
                        this.state.show?( <button onClick={this.NewAddress.bind(this)}>新增地址</button>)
                        :( <button className="green"  onClick={this.NewAddress.bind(this)}>新增地址</button>)
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
)(Add)
