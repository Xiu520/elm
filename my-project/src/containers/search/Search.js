import React from "react";
import {Link} from "react-router-dom"
export default class Search extends React.Component{
    
    render(){
        return(
            <div  className="box search">
                <header>
                    <Link to="/"> <i className="fa fa-fw fa-angle-left" ></i></Link> 
                    <span>收货地址</span>
                </header>
                <div className="content">
                    <div className="inp"><input type="text" placeholder="请输入地址"/><span><i className="fa fa-fw fa-search"></i></span></div>
                    <p className="new">当前地址</p>
                    <ul>
                        <li>地球</li>
                    </ul>
                </div>
            </div>
        )
    }
}