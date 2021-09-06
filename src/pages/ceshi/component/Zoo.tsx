import React from 'react'
import { useState , useRef , forwardRef} from 'react';
import { request } from '_@types_express@4.17.13@@types/express';



const Zoo = forwardRef((params,inputRef) => {
    const [temp, setTemp] = useState(5);

    const onClick = ()=>{
        inputRef.current.focus()
    }
    const queryUser = () =>{
       console.log(132)
    }
    const log = () => {
        setTimeout(() => {
            console.log("3 秒前 temp = 5，现在 temp =", temp);
        }, 3000);
    };

    return (
        <div>
            <div
                onClick={() => {
                    log();
                    setTemp(3);
                    // 3 秒前 temp = 5，现在 temp = 5
                }}
                style={{ width: '50px', height: '30px', background: 'yellow' }}
            >
                点击
            </div>
            <input type="text" ref={inputRef}/>
            <button onClick={onClick}>聚焦</button>
            <button onClick={queryUser}>点击请求</button>

        </div>
    )
})

export default Zoo;