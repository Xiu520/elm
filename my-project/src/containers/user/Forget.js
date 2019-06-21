import React from "react";
import axios from "axios"
axios.defaults.withCredentials=true; //默认携带cookie
export default class Forget extends React.Component{
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

    goBack(){
        this.props.history.goBack()
    }
    ChangePsw(){
        this.setCookie("cap",this.yzm.value,5)
        let data={
            username: this.number.value, 
            oldpassWord: this.oldpassWord.value,
            newpassword: this.newpassword.value,
            confirmpassword: this.confirmpassword.value,
            captcha_code:this.yzm.value
        }
        axios.post("http://elm.cangdu.org/v2/changepassword",data)
        .then(res=>{
            if(res.data.status===0){
                this.setState({
                    warn:res.data.message
                })
            }else if(res.data.status===1){
                this.setState({
                    warn:res.data.success
                })
            }
        })
    }
    times(){
        this.setState({
            warn:""
        }) 
    }
    render(){
        return(
            <div  className="box forget">
                <header>
                    <p><span onClick={this.goBack.bind(this)}> <i className="fa fa-fw fa-angle-left"></i></span> <span>重置密码</span></p>
                    
                </header>
                <ul className="from">
                    <li><input type="text" placeholder="账号" ref={(number)=>this.number=number}/></li>
                    <li><input type="text" placeholder="旧密码" ref={(oldpassWord)=>this.oldpassWord=oldpassWord}/></li>
                    <li><input type="text" placeholder="请输入新密码" ref={(newpassword)=>this.newpassword=newpassword}/></li>
                    <li><input type="text" placeholder="请确认密码" ref={(confirmpassword)=>this.confirmpassword=confirmpassword}/></li>
                    <li className="gai">
                        <input type="text" placeholder="验证码" ref={(yzm)=>this.yzm=yzm}/> 
                        <img src={this.state.arr.code} alt=""/>
                        <p className="change">
                            <span>看不清</span>
                            <a onClick={this.changePage.bind(this)}>换一张</a>
                        </p>
                    </li>
                </ul>

                <div className="red">
                    <button onClick={this.ChangePsw.bind(this)}>确认修改</button>
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