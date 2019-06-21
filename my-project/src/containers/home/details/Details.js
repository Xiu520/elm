import React from "react";
import axios from "axios"
import {Link} from "react-router-dom"
import {Icon} from "antd"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from "../../../redux/action/index.js"//* as 表示导出所有的包
import $ from "jquery"
class Details extends React.Component{
    constructor(){
        super();
        this.state={
            headList:[],//头部渲染
            navList:[],//左边侧边栏渲染
            activeList:[],//头部活动渲染
            activity:true,//头部活动是否存在
            go:"还差20元起送",//尾部起送
            price:0.00,//尾部总价
            num:0,//尾部总数
            list:[],//购物车列表
            show:false//遮罩是否显示
        }
    }
    componentDidMount(){
        axios.get("http://elm.cangdu.org/shopping/restaurant/"+this.props.match.params.id+"?latitude=45.80031&longitude=126.50329&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics")
        .then(res=>{
            if(res.data){
                if(res.data&&res.data.activities.length>0){
                    this.setState({
                        headList:res.data,
                        activeList:res.data.activities[0]
                    })
                }else{
                    this.setState({
                        headList:res.data,
                        activity:false
                    })
                }
                
            }
        })
        axios.get("http://elm.cangdu.org/shopping/v2/menu?restaurant_id="+this.props.match.params.id)
        .then(res=>{
            if(res.data){
                for(let i=0;i<res.data.length;i++){
                    for(let j=0;j<res.data[i].foods.length;j++){
                       res.data[i].foods[j].number=0
                    }
                }
                
                this.setState({
                    navList:res.data,
                    indexTab:res.data[0].id
                })
                
            }
        })

        this.get()
        $("#Right").scroll(this.more.bind(this))
    }
    
    //封装组件  页面刷新
    get(){
        if(this.props.data.Data.totalNum>0){
            this.state.go="去结算"
        }else{
            this.state.go="还差20元起送"
            this.state.show=false
        }
        this.setState({
            list:this.props.data.Data.arr,
            go:this.state.go,
            num:this.props.data.Data.totalNum,
            price:this.props.data.Data.totalPrice
        })
    }
    //左右联动
    more(){
        let scrollTop=document.getElementById("Right").scrollTop;//滚动条的高
        let dlArr=document.getElementsByClassName("dl")//找到所有dl
        for(let i=0;i<dlArr.length;i++){
            if(scrollTop>=dlArr[i].offsetTop-154&&scrollTop<dlArr[i+1].offsetTop-154){
                this.setState({
                    indexTab:dlArr[i].getAttribute("id")
                })
                
            }
        }
    }
    //左右联动
    change(id){
        $("#Right").unbind("scroll")
        this.setState({
            indexTab:id
        })
        let dl=document.getElementById(id);
        let top=dl.offsetTop;
        $("#Right").animate({"scrollTop":top-153},()=>{
            $("#Right").scroll(this.more.bind(this))
        })
    }
    
    //增加
    addNum(i,event){
        var top = event.clientY, // 小球降落起点
        left = event.clientX,
        endTop = window.innerHeight+30 ,  // 小球降落终点
        endLeft = 30;
        // 小球到达起点
        var outer = $('#points .pointPre').first().removeClass("pointPre").css({
            left: left + 'px',
            top: top + 'px'
        });
        var inner = outer.find(".point-inner");
        setTimeout(function () {
            // 将jquery对象转换为DOM对象
            outer[0].style.webkitTransform = 'translate3d(0,' + (endTop - top) + 'px,0)';
            inner[0].style.webkitTransform = 'translate3d(' + (endLeft - left) + 'px,0,0)';
            // 小球运动完毕恢复到原点
            setTimeout(function () {
                outer.removeAttr("style").addClass("pointPre");
                inner.removeAttr("style");
            }, 1000);  //这里的延迟值和小球的运动时间相关
        }, 1);

        this.props.actions.addNum(i)
        this.get()
    }
    //减少
    lessNum(i){
        this.props.actions.lessNum(i)
        this.get()
    }
    //购物车
    Cart(){
        if(this.state.show){
            this.state.show=false
        }else{
            this.state.show=true
        }
        this.setState({
            show:this.state.show
        })
    }
    //购物车隐藏
    hide(){
        this.setState({
            show:false
        })
    }
    //清空购物车
    Alldel(){
        this.props.actions.Alldel()
        this.get()
        this.setState({
            show:false
        })
    }
    render(){
        return(
            <div  className="box details">
                <header>
                    <dl>
                        <dt className="dt">
                            <Link to="/"><i className="fa fa-fw fa-angle-left"></i></Link>
                            <img src={'https://elm.cangdu.org/img/'+this.state.headList.image_path} />
                        </dt>
                        <dd>
                            <p className="title">{this.state.headList.name}</p>
                            <p>商家配送/分钟送到/配送费￥{this.state.headList.float_delivery_fee} <span><i className="fa fa-fw fa-angle-right"></i></span></p>
                            <p>公告:{this.state.headList.promotion_info}</p>
                        </dd>
                        
                    </dl>
                    {
                        this.state.activity?
                        <p className="pp" ><span>{this.state.activeList.icon_name}</span>{this.state.activeList.description}(APP专享)</p>
                        :""
                    }
                </header>
                <div className="content">
                    <div className="nav">
                       <ul>
                           <li>商品</li>
                           <li>评价</li>
                       </ul>
                    </div>
                    <div className="center">
                        <div className="left" id="Left">
                        <ul >
                            {
                                this.state.navList.map((item)=>{
                                    return(
                                        <li key={item.id} data-id={item.id} onClick={this.change.bind(this,item.id)} className={this.state.indexTab==item.id?"active":"name"}>{item.name}</li>
                                    )
                                })
                            }
                        </ul>
                        </div>

                        

                        <div id="Right" className="right">
                            {
                                this.state.navList.map((item,index)=>{
                                    return(
                                        <dl key={index}  className="dl" id={item.id}>
                                            <dt>
                                                <span>{item.name}</span> <span>{item.description}</span>
                                            </dt>
                                            <dd>
                                                {
                                                    item.foods.map((i,index1)=>{
                                                        return(
                                                            <ul key={index1}>
                                                                <li className="li1"><img src={`https://elm.cangdu.org/img/${i.image_path}`} alt=""/></li>
                                                                <li className="li2">
                                                                    <p className="p1">{i.name}</p>
                                                                    <p className="p2">{i.description}</p>
                                                                    <p className="p3"><span className="count">月售{i.month_sales}</span>   <span className="count">好评率{i.satisfy_rate}%</span></p>
                                                                    <p className="img">{i.activity?<span>{i.activity.image_text}</span>:""}</p>
                                                                    <div className="p4"><span className="mon">￥{i.specfoods[0]?i.specfoods[0].price:''}</span><span className="qi">起</span>
                                                                    {/* <p><span className="jia" onClick={this.addNum.bind(this,i)}><Icon type="plus-circle" theme="filled" /></span></p> */}
                                                                    {
                                                                        i.specifications!=''?<span  className="gui">选规格</span>:
                                                                        ( 
                                                                        <p>
                                                                            <span  className={i.number>0?'jian':'hide'} key={index} >
                                                                                <span onClick={this.lessNum.bind(this,i)}><Icon type="minus-circle"/></span>
                                                                                <span className="num">{i.number}</span>
                                                                            </span>  
                                                                            <span className="jia" onClick={this.addNum.bind(this,i)}><Icon type="plus-circle" theme="filled" /></span>
                                                                        </p>
                                                                        )
                                                                    } 
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        )
                                                    })
                                                }
                                            </dd>
                                        </dl>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className={this.state.show?"cav":"hide"} onClick={this.hide.bind(this)}></div>

                 {/* 小球开始 */}
                 <div id="points">
                        <div className="pointOuter pointPre">
                            <div className="point-inner"></div>
                        </div>
                        <div className="pointOuter pointPre">
                            <div className="point-inner"></div>
                        </div>
                        <div className="pointOuter pointPre">
                            <div className="point-inner"></div>
                        </div>
                        <div className="pointOuter pointPre">
                            <div className="point-inner"></div>
                        </div>
                        <div className="pointOuter pointPre">
                            <div className="point-inner"></div>
                        </div>
                        <div className="pointOuter pointPre">
                            <div className="point-inner"></div>
                        </div>
                        <div className="pointOuter pointPre">
                            <div className="point-inner"></div>
                        </div>
                    </div>
                {/* 小球结束 */}

                <div className={this.state.show?"nn":"hide"}>
                        <div className="cc">
                            <div className="top">
                                <p>购物车</p> 
                                <p onClick={this.Alldel.bind(this)}><Icon type="delete" />清空</p>
                            </div>
                            <ul>
                                {
                                    this.state.list.map((item,index)=>{
                                        return(
                                            <li key={index}>
                                                <p>{item.name}</p>
                                                <p>￥{item.specfoods[0].price}</p>
                                                <p>
                                                    <span  className="jian" >
                                                        <span onClick={this.lessNum.bind(this,item)}><Icon type="minus-circle"/></span>
                                                        <span className="num">{item.number}</span>
                                                    </span>
                                                    <span className="jia" onClick={this.addNum.bind(this,item)}><Icon type="plus-circle" theme="filled" /></span>
                                                </p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                <div className={this.state.go==="还差20元起送"?"footer":"footer1"}>
                    {
                        this.state.num>0?
                        (<div className="left">
                            <div className="cart" onClick={this.Cart.bind(this)}>
                                <i className="fa fa-fw fa-shopping-cart"></i>
                            </div>
                            <span className="red">{this.state.num}</span>
                            <div className="total"  onClick={this.hide.bind(this)}>
                                <p>￥{this.state.price}</p>
                                <p>配送费￥5</p>
                            </div>
                        </div>)
                        :
                        (<div className="left" >
                            <div className="cart">
                                <i className="fa fa-fw fa-shopping-cart"></i>
                            </div>
                            <span className="red">{this.state.num}</span>
                            <div className="total">
                                <p>￥{this.state.price}</p>
                                <p>配送费￥5</p>
                            </div>
                        </div>)
                    }
                    <div className="right"><a>{this.state.go}</a></div>
                </div>

               
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
)(Details)