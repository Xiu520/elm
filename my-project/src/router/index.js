import React from "react"
import Loadable from "react-loadable"//路由懒加载
let config=[
    {
        name:"/",
        path:"/",
        hasFooter:false,
        exact:true,//精准匹配
        component:Loadable({
            loader:() => import("../components/elm/Home.js"),
            //要加载的组件
            loading:( )=> <div/>
            //路由懒加载的第二个功能  预防项目加载失败
        })
    },
    {
        name:"/find",
        path:"/find",
        hasFooter:false,
        exact:true,
        component:Loadable({
            loader:() => import("../components/elm/Find.js"),
            loading:() => <div/>
        })
    },
    {
        name:"/details",
        path:"/details",
        hasFooter:false,
        exact:true,
        component:Loadable({
            loader:() => import("../components/elm/Details.js"),
            loading:() => <div/>
        })
    },
    {
        name:"/user",
        path:"/user",
        hasFooter:false,
        exact:true,
        component:Loadable({
            loader:() => import("../components/elm/User.js"),
            loading:() => <div/>
        })
    },
    {
        name:"/search",
        path:"/search",
        hasFooter:true,
        exact:true,
        component:Loadable({
            loader:() => import("../components/elm/Search.js"),
            loading:() => <div/>
        })
    }
]

export default config