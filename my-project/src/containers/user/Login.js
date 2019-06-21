import React from 'react'
import axios from "axios"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from "../../redux/action/index.js"//* as 表示导出所有的包

import {Link} from "react-router-dom"
axios.defaults.withCredentials=true; //默认携带cookie

class Login extends React.Component{
    constructor(){
        super();
        this.state={
            arr:[],
            warn:""
        }
    }
    componentDidMount(){
        axios.post("http://elm.cangdu.org/v1/captchas")
        .then(res=>{
            if(res.data){
                this.setState({
                    arr:res.data
                })
            }
        })

    }
    changePage(){
        axios.post("http://elm.cangdu.org/v1/captchas")
        .then(res=>{
            if(res.data){
                this.setState({
                    arr:res.data
                })
            }
        })
    }
    setCookie(name,value,day){
        var exp=new Date();
        exp.setDate(exp.getDate()+day);
        document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString();
    }

    Login(){
        // 登录逻辑
        let username=this.username.value
        let password=this.password.value
        let yzm=this.yzm.value

        let unameBool=/^1[3456789]\d{9}$/.test(username);
        // let psdBool=/^[A-z]\d{5,11}$/.test(password);
        let psdBool=/^\d{5,11}$/.test(password);

        let mBool=/^\d{4}$/.test(yzm);

        if(!unameBool){
            this.setState({
                warn:"用户名格式不正确"
            })
        }
        if(!psdBool){
            this.setState({
                warn:"密码格式不正确"
            })
        }
        if(!mBool){
            this.setState({
                warn:"验证码不能为空"
            })
        }
        if(unameBool&&psdBool&&mBool){
            this.setState({
                warn:""
            })
            this.setCookie("cap",yzm,5)
            let data={username:username,password:password,captcha_code:yzm};
            axios
            .post('http://elm.cangdu.org/v2/login',data)
            .then((res)=>{
                if(res.data.status===0){
                    this.setState({
                        warn:res.data.message
                    })
                }else{
                    this.props.actions.login(res.data)
                    this.props.history.push("/user")
                }
            })
        }
    }
    times(){
        this.setState({
            warn:""
        })
    }
    render(){
        return(
            <div  className="box login">
                <header>
                    <p><Link to="/user"><i className="fa fa-fw fa-angle-left"></i></Link> <span>密码登录</span></p>
                    
                </header>
                <ul className="from">
                    <li><input type="text" placeholder="账号" ref={(uname)=>{this.username=uname}}/></li>
                    <li>
                        <input type="password" placeholder="密码" ref={(psd)=>{this.password=psd}}/>
                    </li>
                    <li className="gai">
                        <input type="text" placeholder="验证码" ref={(yzm)=>{this.yzm=yzm}}/> 
                        <img src={this.state.arr.code} alt=""/>
                        <p className="change">
                            <span>看不清</span>
                            <a onClick={this.changePage.bind(this)}>换一张</a>
                        </p>
                    </li>
                </ul>
                <div className="red">
                    <p>温馨提示: 未注册过的账号登录时将自动注册</p>
                    <p>注册过的用户可凭账号密码登录</p>
                    <button onClick={this.Login.bind(this)}>登录</button>
                    <p className="again"><Link to="/forget">重置密码?</Link></p>
                </div>
                {
                    this.state.warn?
                    (<div className="alet">
                        <section className="tip_text_container">
                            <div className="tip">
                                <div className="tip_icon">
                                    <span></span>
                                    <span></span>
                                </div>
                                <p>{this.state.warn}</p>
                            </div>
                            <button onClick={this.times.bind(this)}>确认</button>
                        </section>
                    </div>)
                    :""
                }
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
)(Login)