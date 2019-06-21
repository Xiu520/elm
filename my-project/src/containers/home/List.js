import React, {Component} from 'react';
// import {Carousel, Input, Tabs, Icon} from 'antd';
import axios from "axios"
import {Link} from "react-router-dom"
class List extends Component {
    constructor(){
        super()
        this.state={
            list:[],
            n:0,
            isLoadingMore:false
        }
    }
    componentDidMount(){
        axios.get('http://elm.cangdu.org/shopping/restaurants?latitude=31.249601&longitude=121.455704&offset=0&limit=30&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=')
        .then((res)=>{
            if(res.data){
                this.setState({
                    list:res.data
                })
            }  
        })
        const wrapper = this.refs.wrapper;
        const loadMore = this.loadMore;
        const that = this; // 为解决不同context的问题
        let timeCount;


        function callback() {
                // const top = wrapper.getBoundingClientRect().top;
                const top = wrapper.getBoundingClientRect().top;
                const windowHeight = window.screen.height;

                if (top && top < windowHeight) {
                // 当 wrapper 已经被滚动到页面可视范围之内触发
                loadMore(that);
                }
            
        }

        window.addEventListener('scroll', function () {
                if (this.state.isLoadingMore) {
                    return ;
                }

                if (timeCount) {
                    clearTimeout(timeCount);
                }

                timeCount = setTimeout(callback, 1000);
        }.bind(this), false);
    }
    loadMore(that){
        that.state.n+=10
        axios.get("http://elm.cangdu.org/shopping/restaurants?latitude=39.78493&longitude=116.49476&offset="+that.state.n+"&limit=8&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=")
        .then(response => {
            console.log(response)
            that.setState({
                list:that.state.list.concat(response.data)
            })
        })
    }
   
    

    render(){
        return(
                <div className="con">
                    {
                        this.state.list.map((item,index) => {
                        return(
                            <Link to={`/details/${item.id}`} key={index}>                                    
                                <dl >
                                    <dt>
                                    <img src={'https://elm.cangdu.org/img/'+item.image_path}/>
                                    </dt>
                                    <dd>
                                        <p className="p1">
                                            {
                                                item.is_premium?
                                                <span className="pin">品牌</span>
                                                :""
                                            }
                                                
                                            <span className="title">{item.name}</span>
                                        </p>
                                        <p className="p2">
                                            <span className="star">
                                                <span className="xing" style={{width:`${100*item.rating/5}%`}}></span>
                                            </span> 
                                            <span className="fen">{item.rating}</span>
                                            <span className="count">月售{item.recent_order_num}单</span>
                                            {
                                                item.delivery_mode?
                                                <span className="feng">{item.delivery_mode.text}</span>
                                                :""
                                            }
                                            <span className="zhun">准时达</span>   
                                        </p>
                                        <p className="p3">
                                            ￥<span>{item.float_minimum_order_amount}</span>
                                            起送/配送费约￥<span>{item.float_delivery_fee}</span>
                                            <span>{item.distance}</span>
                                            /<span>{item.order_lead_time}</span>
                                        </p>
                                    </dd>
                                </dl>
                            </Link>
                            )
                        })
                    } 
                    <p onClick={this.loadMore.bind(this,this)} ref="wrapper" className="show">
                        {this.state.list.length?
                            <span>loading...</span>
                            : <span>没有更多数据了</span>
                        }
                    </p>
                </div>
        )
    }
}



export default List;