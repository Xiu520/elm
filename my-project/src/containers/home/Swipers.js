
import React from 'react';
import axios from "axios"

import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'


class Swipers extends React.Component{
    constructor(){
        super();
        this.state={
            data:[],
            resArr:[]
        }
    }
    componentDidMount(){
        axios.get('http://elm.cangdu.org/v2/index_entry?geohash=39.78493,116.49476&group_type=1&flags[]=F')
        .then((res) => {
            if (res.data) {
                let len = res.data.length;
                let resArr = res.data;
                let food = [];
                for (let i = 0, j = 0; i < len; i += 8, j++) {
                    food[j] = resArr.splice(0, 8);
                }
                this.state.data = food;
            }
            this.setState({
                data:this.state.data
            },()=>{
                new Swiper ('.swiper-container', {
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true
                    },
                    autoplay:{      //自动播放，注意：直接给autoplay:true的话，在点击之后不能再自动播放了
                          delay: 2500,
                          disableOnInteraction: false,
                    }
                })  
            }  
            )
            console.log(this.state.data)
        })
        
    }
    render(){
        return(
            <div className="swiper">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            this.state.data.map((item,index) => {
                                return(
                                    <div key={index} className="swiper-slide"> 
                                        <ul>
                                            {
                                                item.map((i,n) => {
                                                    return(
                                                        <li key={n}>
                                                            <img src={`https://fuss10.elemecdn.com${i.image_url}`}/>
                                                            <span>{i.title}</span> 
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='swiper-pagination'></div>
                </div>
            </div>
        )
    }


}


export default Swipers;
