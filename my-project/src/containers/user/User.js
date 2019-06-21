import React from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import { Avatar } from 'antd';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from "../../redux/action/index.js"//* as 表示导出所有的包

class User extends React.Component{
    constructor(){
        super();
        this.state={
            uname:"",
            avatar:""
        }
    }
    componentDidMount(){
        let user_id=localStorage.getItem('user_id')
        axios.get(`http://elm.cangdu.org/v1/user?user_id=${user_id}`)
        .then((res)=>{
            // console.log(res.data)
            if(res.data){
                this.setState({
                    uname:res.data.username,
                    avatar:res.data.avatar
                })
            }
        })
        
    }
    
    render(){
        return(
            <div  className="box user">
                <header>
                    <p><Link to="/"><i className="fa fa-fw fa-angle-left"></i></Link> <span>我的</span></p>
                    <dl>
                        <dt>
                            {
                                this.state.avatar?(<img src={`http://elm.cangdu.org/img/${this.state.avatar}`} />)
                                :(<Avatar size={64} icon="user" style={{ color: '#DCDCDC', backgroundColor: '#fff' }}/>)
                            }
                            
                        </dt>
                        <dd>
                            {
                                this.state.uname?
                                (<p className="deng"><Link to="/message"> {this.state.uname} </Link><Link to="/message"> <i className="fa fa-fw fa-angle-right"></i></Link></p>)   
                                :                
                                (<p className="deng"><Link to="/login"> 登录/注册 </Link><Link to="/login"> <i className="fa fa-fw fa-angle-right"></i></Link></p>) 
                            }
                            <p className="bang">暂无绑定手机号</p>
                        </dd>
                    </dl>
                </header>
                <ul className="you">
                    <li>
                        <p><span>0.00</span> 元</p>
                        <p>我的余额</p>
                    </li>
                    <li>
                        <p><span>0</span> 个</p>
                        <p>我的优惠</p>
                    </li>
                    <li>
                        <p><span>0</span> 分</p>
                        <p>我的积分</p>
                    </li>
                </ul>
                <ul className="ding">
                    <li><p><Link to="/order">我的订单</Link> <i className="fa fa-fw fa-angle-right"></i></p></li>
                    <li><p><Link to="/order">积分商城</Link>  <i className="fa fa-fw fa-angle-right"></i></p></li>
                    <li><p><Link to="/order">饿了么会员卡</Link> <i className="fa fa-fw fa-angle-right"></i></p></li>
                </ul>
                <ul className="ding">
                    <li><p><Link to="/order">服务中心</Link> <i className="fa fa-fw fa-angle-right"></i></p></li>
                    <li><p><Link to="/order">下载饿了么APP</Link> <i className="fa fa-fw fa-angle-right"></i></p></li>
                </ul>
            </div>
        )
    }
}


function mapStateToProps(state){//state就是 redux store 里面声明的数据
    return{
        data:state
    }
}
function mapDispatchToProps(dispatch){
    return{
        actions:bindActionCreators(actions,dispatch)
        //通过bindActionCreators把 redux action里面定义的方法引入
    }
}
export default connect( //给当前组件  添加一个方法mapStateToProps把
    mapStateToProps,mapDispatchToProps
)(User)