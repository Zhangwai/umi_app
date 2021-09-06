import React from 'react'
import { useState, useEffect } from 'react'

//自定义hook
const useCourt = (params:any) => {
    const [court, setCourt] = useState(0)
    useEffect(() => {
        console.log('开启计时器')
        let timer = setInterval(()=>{
            console.log('进入计时器')
            setCourt(x=>x+1)
        },1000)
        // console.log("useEffect")

        return () => {
            // console.log("clearEffect")
            console.log('移除计时器')
            clearInterval(timer)
        }
    },[])

    useEffect(()=>{
        document.title = `点击了${court}次`
    })
    return [court , setCourt];
}


const Foo = () => {
   
    const [state, setState] = useState({ type: 'add', num: 0 })
    const [court ,setCourt] = useCourt()
    const onClick = () => {
        setCourt((court) => {
            court++
            return court
        })

        setState((prevState) => {
            prevState = { ...prevState, num: prevState.num + 1 };
            return prevState
        })
    }

    /**
  * 做副作用操作
  * 1、修改dom 2、修改全局变量 3、ajax 4、计时器 5、存储相关
  * 和外部变量相关的操作到useEffect这个hook里面去做
  * 
  * 存在清理函数的时候 组件销毁的时候也会执行
  * 1、render + useEffect -> render + clearEffect + useEffect
  */
    console.log('render')

   
    return (
        <div>

            <div>court:{court}</div>
            <div>state:{state.num}</div>
            <button onClick={onClick}>+1</button>
        </div>
    )
}

export default Foo