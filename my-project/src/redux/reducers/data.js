let initState = {
    arr:[],//购物车添加
    totalNum:0,//总数
    totalPrice:0,//总价
    address:{}
};



var jsonCar = getLocal("shopCar")
if(jsonCar){  //如果有就是指initState为jsonCar
    initState=jsonCar
}else{
    initState={
        arr:[],
        totalNum:0,  //总数
        totalNum:0   //总价
    }
}

export default function rootReducers(state=initState,action){// action
    switch(action.type){
        case "LOGIN":
            state.list=action.data;
            localStorage.setItem("user_id",JSON.stringify(action.data.user_id))
            return state
        case "ADDNUM":
            add(initState.arr,action.data)
            setLocal(state)
            return state
        case "LESSNUM":
            less(action.data)
            setLocal(state)
            return state
        case "ALLDEL":
            alldel()
            setLocal(state)
            return state
        case "SEND":
            state.address=action.data
            return state
        default:
        return state
    }
    return state;
}
//增加
function add(arr,act){
    if(arr.length===0){
        act.number++
        arr.push(act)
    }else{
        var m=true;
        arr.map(item => {
            if (item.item_id === act.item_id){
                item.number++;
                m=false
            }
        })
    }
    if(m===true){
        act.number++
        arr.push(act)
    }
    setLocal()
    getCarInfo()
    
}


//减
function less(i){
    initState.arr.map((it,index)=>{
        if(it.item_id==i.item_id){
            if(it.number>=1){
                it.number--;
            }else{
                initState.arr.splice(index,1) 
            }
        }
    })
    setLocal()
    getCarInfo()
}
//清空
function alldel(){
    initState.arr.splice(0) 
    initState.totalPrice=0
    initState.totalNum=0
    let obj ={}
    obj.arr=initState.arr
    obj.totalPrice=0
    obj.totalNum=0
    setLocal(obj)
  
}
//数量
function getCarInfo(){
    initState.totalPrice = 0;
    initState.totalNum =0;
    initState.arr.map(item=>{
        initState.totalNum += item.number
        initState.totalPrice += item.specfoods[0].price * (item.number)
    })
}


//本地存储
function setLocal(obj){
    localStorage.setItem("shopCar",JSON.stringify(obj))
}


function getLocal(name){
    if(localStorage.getItem(name)){
        return JSON.parse(localStorage.getItem(name))
    }
}