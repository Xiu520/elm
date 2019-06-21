import React from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import {Icon} from "antd"


export default class UserName extends React.Component{
    constructor(){
        super();
        this.state={
            
        }
    }
    componentDidMount(){
        
        
    }
    goBack(){
        this.props.history.goBack()
    }
    render(){
        return(
            <div  className="box username">
                <header>
                    <p><span onClick={this.goBack.bind(this)}> <i className="fa fa-fw fa-angle-left"></i></span> <span>修改用户名</span> </p>
                </header>
                <div className="setname">
                    <input type="text" placeholder="输入用户名"/>
                    <p>用户名只能修改一次(5-24字符之间)</p>
                    <button>确认修改</button>
                </div>
                
                
            </div>
        )
    }
}


