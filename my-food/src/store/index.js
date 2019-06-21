import Vue from "vue"
import vuex from "vuex"

Vue.use(vuex);

// import VuePersist from 'vuex-persist'
// const vuexLocal=new VuePersist({
//     storage:window.localStorage
// })



export default new vuex.Store({
    // plugins:[vuexLocal.plugin],//安装插件
    state:{//存储变量
        user_id:"",
        detail:'',
        geohash:'',
        buyCart:[],//购物车,
        totalPrice:0,//总价
        totalNum:0,//总数
    },
    mutations:{
        login(state,id){
            state.user_id=id
            window.localStorage.setItem("user_id",state.user_id)
        },
        addDetail(state,detail){
            state.detail=detail
        },
        city(state,geohash){
            state.geohash=geohash
            window.sessionStorage.setItem("geohash",state.geohash)
        },
        //加
        Add(state,item){
            let cart=JSON.parse(localStorage.getItem("buyCart"))
            if(cart){
                state.buyCart=cart
            }
            if(state.buyCart.length===0){
                item.num++
                state.buyCart.push(item)
            }else{
                var m=true;
                state.buyCart.map(i => {
                    if (i.sku_id === item.sku_id){
                        i.num++;
                        m=false
                    }
                })
            }
            if(m===true){
                item.num++
                state.buyCart.push(item)
            }
            getCarInfo(state)
            localStorage.setItem("buyCart",JSON.stringify(state.buyCart))
        },
        //减
        Less(state,i){
            state.buyCart.map((it,index)=>{
                if(it.sku_id==i.sku_id){
                    if(it.num>=1){
                        it.num--;
                    }else{
                        state.buyCart.splice(index,1) 
                    }
                }
            })
            getCarInfo(state)
            localStorage.setItem("buyCart",JSON.stringify(state.buyCart))
        },
        
    }
})

function getCarInfo(state){
    state.totalPrice = 0.00;
    state.totalNum =0;
    state.buyCart.map(item=>{
        state.totalNum += item.num
        state.totalPrice += item.price * (item.num)
    })
    let data={"totalNum":state.totalNum,"totalPrice":state.totalPrice}
    localStorage.setItem("total",JSON.stringify(data))
}