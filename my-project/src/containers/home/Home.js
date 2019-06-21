import React from "react";
import {Link} from "react-router-dom"
import Swipers from "./Swipers.js"
import List from "./List.js"

export default class Home extends React.Component{
    render(){
        return(
            <div className=" home">
                <header>
                    <p>  <Link to="/search"><i className="fa fa-fw fa-map-marker"></i><span className="whe">昌平马池口</span> <span><i className="fa fa-fw fa-caret-down"></i></span></Link></p>
                    <p className="p1"><input type="text" placeholder="搜索商家、商品名称"/> <span><i className="fa fa-fw fa-search"></i></span></p>
                </header>
                <div className="content">
                    <Swipers></Swipers>
                    <List></List>
                </div>
                
            </div>
        )
    }
}