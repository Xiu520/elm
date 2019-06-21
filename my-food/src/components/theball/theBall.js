import './theBall.css'
export const  TheBall={
	newBall(event){//当前点击的元素
		let div=document.createElement('div');
		div.className='ballFather';
		document.body.appendChild(div);

		let sonDiv=document.createElement('div');
		sonDiv.className='ballSon';
		div.appendChild(sonDiv);


		let top=event.target.getBoundingClientRect().top;//获得 跳动小球top
		let left=event.target.getBoundingClientRect().left;//获得 left
		div.style.left=left+'px';
		div.style.top=top+'px';

		let y = (window.innerHeight - top);// 下落的高度
		// div.style.display ='';
		div.style.webkitTransform = `translate3d(0,${y}px,0)`;
		div.style.transform = `translate3d(0,${y}px,0)`;

		sonDiv.style.webkitTransform = `translate3d(-${left-10}px,0,0)`;
		sonDiv.style.transform = `translate3d(-${left-10}px,0,0)`;
		//保证 小球运动结束后，调用购物车的动画

		setTimeout(()=>{
			// document.body.removeChild(div);
			document.querySelector('.shopping_footer').classList.add("animation");
			setTimeout(()=>{
				document.querySelector('.shopping_footer').classList.remove("animation");
			},400)
		},620)
	}
}
