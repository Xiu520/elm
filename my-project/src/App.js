import React, { Component } from 'react';
import {Route,Switch,BrowserRouter,Link} from "react-router-dom";
import "./containers/style/elm.css"
import "./components/rem.js"
import Loadable from "react-loadable"//路由懒加载
// import routers from "./router/index"
import Footer from "./containers/elm/Footer.js";


export default class App extends React.Component {
  render() {
    return (
      <div className="all">
        <BrowserRouter>

          <Route path="/" exact component={Loadable({
            loader:()=> import ("./containers/home/Home.js"),
            loading:()=><div/>
          })}/>

          <Route path="/find" exact component={Loadable({
            loader:()=> import ("./containers/find/Find.js"),
            loading:()=><div/>
          })}/>

          <Route path="/order" exact component={Loadable({
            loader:()=> import ("./containers/order/Order.js"),
            loading:()=><div/>
          })}/>

          <Route path="/user" exact component={Loadable({
            loader:()=> import ("./containers/user/User.js"),
            loading:()=><div/>
          })}/>

          <Switch>
            <Route path="/search" exact component={Loadable({
              loader:()=> import ("./containers/search/Search.js"),
              loading:()=><div/>
            })}/>
            <Route path="/details/:id" exact component={Loadable({
              loader:()=> import ("./containers/home/details/Details.js"),
              loading:()=><div/>
            })}/>
            <Route path="/login" exact component={Loadable({
              loader:()=> import ("./containers/user/Login.js"),
              loading:()=><div/>
            })}/>
            <Route path="/forget" exact component={Loadable({
              loader:()=> import ("./containers/user/Forget.js"),
              loading:()=><div/>
            })}/>
            <Route path="/message" exact component={Loadable({
              loader:()=> import ("./containers/user/message/Message.js"),
              loading:()=><div/>
            })}/>
            <Route path="/address" exact component={Loadable({
              loader:()=> import ("./containers/user/message/Address.js"),
              loading:()=><div/>
            })}/>
            <Route path="/add" exact component={Loadable({
              loader:()=> import ("./containers/user/message/Add.js"),
              loading:()=><div/>
            })}/>
            <Route path="/addDetail" exact component={Loadable({
              loader:()=> import ("./containers/user/message/AddDetail.js"),
              loading:()=><div/>
            })}/>
            <Route path="/username" exact component={Loadable({
              loader:()=> import ("./containers/user/message/UserName.js"),
              loading:()=><div/>
            })}/>
            <Footer></Footer>
          </Switch>


        </BrowserRouter>
      </div>
    )
  }
}

