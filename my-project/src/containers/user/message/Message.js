import React from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import { Upload, Icon, message } from 'antd';　

export default class Message extends React.Component{
    constructor(){
        super();
        this.state={
            username:"",
            avatar:"",
            warn:false,
            file:""
        }
    }
    componentDidMount(){
        let user_id=localStorage.getItem('user_id')
        axios.get(`http://elm.cangdu.org/v1/user?user_id=${user_id}`)
        .then((res)=>{
            if(res.data){
                this.setState({
                    username:res.data.username,
                    avatar:res.data.avatar
                })
            }
        })
        
        
    }

    handFile(e) {
        e.preventDefault()//阻止浏览器进行 默认行为
        let $target = e.target || e.srcElement;
        //获取上传文件信息
        let file = $target.files[0];
        //读取文件
        var reader = new FileReader();
        //读取完成
        reader.onload = data => {
            let res = data.target || data.srcElement;
            this.state.file = res.result;
            this.setState({
                file: res.result,
            })
        }
        // 通过FormData对象发送表单数据
        let formData = new FormData(); 
        formData.append('file', file); 
        const instance=axios.create({
            withCredentials: true
            // 需要设置 withCredentials：true , 表示跨域请求时是否需要使用凭证. 默认为false
        })  
            console.log(formData)
        //将头像通过接口上传到浏览器
        let user_id=localStorage.getItem('user_id');
        instance.post('http://elm.cangdu.org/eus/v1/users/'+user_id+'/avatar',formData)
        .then(res => {
            
        })
        //把文件地址读取出来
        reader.readAsDataURL(file);
    }

    
    goBack(){
        this.props.history.push("/user")
    }
    giveUp(){
        this.setState({
            warn:true
        })
        
    }
    Wait(){
        this.setState({
            warn:false
        })
    }
    
    Back(){
        localStorage.setItem('user_id',"")
        this.props.history.push("/user")
    }

    
    
    render(){
        return(
            <div  className="box message">
                <header>
                    <p><span onClick={this.goBack.bind(this)}> <i className="fa fa-fw fa-angle-left"></i></span> <span>账户信息</span></p>
                </header>
                <ul className="from">
                    <li className="tou">
                        <span>头像</span>
                            <span className="right">
                                {this.state.file.length>0?
                                    (<span>
                                        <img src={this.state.file} />
                                        <Icon type="right" />
                                    </span>): 
                                    (<span>
                                        <img src={"http://elm.cangdu.org/img/"+this.state.avatar} /> 
                                        <Icon type="right"  />
                                    </span>
                                )}
                                <input type="file" accept="image/jpeg, image/jpg, image/png" onChange={this.handFile.bind(this)} />         
                            </span>
                    </li>
                    <li>
                        <Link to="/username">
                            <span>用户名</span>
                            <span className="right">
                                <span>{this.state.username}</span>
                                <Icon type="right" />
                            </span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/address">
                            <span>收货地址</span>
                            <span className="right"><Icon type="right" /></span>
                        </Link>
                    </li>
                    <p>账号绑定</p>
                    <li>
                        <span>手机</span>
                        <span className="right"><Icon type="right" /></span>
                    </li>
                    <p>安全设置</p>
                    <li >
                        <Link to="/forget">
                            <span>登录密码</span>
                            <span className="right">
                                <span>修改</span>
                                <Icon type="right" />
                            </span>
                        </Link>
                        
                    </li>
                </ul>
                <button onClick={this.giveUp.bind(this)}>退出登录</button>
                {
                    this.state.warn?
                    (<div className="alet">
                        <section className="tip_text_container">
                            <div className="tip">
                                <div className="tip_icon">
                                    <span></span>
                                    <span></span>
                                </div>
                                <p>是否退出登录</p>
                            </div>
                            <p>
                                <button onClick={this.Wait.bind(this)}>再等等</button>
                                <button onClick={this.Back.bind(this)}>退出登录</button>
                            </p>
                            
                        </section>
                    </div>)
                    :""
                }
            </div>
        )
    }
}



