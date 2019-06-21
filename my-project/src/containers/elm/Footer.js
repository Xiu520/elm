import React from "react";
import {Link} from "react-router-dom"
export default class Footer extends React.Component{
    render(){
        return(
            <footer>
                <ul>
                    <li> <Link to="/"> <i className="fa fa-fw fa-home" ></i> <p>首页</p></Link> </li>
                    <li> <Link to="/find"><i className="fa fa-fw fa-compass" ></i> <p>发现</p></Link></li>
                    <li><Link to="/order"><i className="fa fa-fw fa-file-text-o" ></i> <p>订单</p></Link></li>
                    <li><Link to="/user"><i className="fa fa-fw fa-user-o" ></i> <p>我的</p></Link></li>
                </ul>
            </footer>
        )
    }
}