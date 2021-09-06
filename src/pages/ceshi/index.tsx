import React from 'react'
import { useState, useRef } from 'react'
import Foo from './component/Foo'
import Zoo from './component/Zoo'
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
const ceshi = () => {

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(true)
    const inputRef = useRef()
    const onClick = () => {
        setVisible(visible => !visible)
    }
    const onClick2 = () => {
        setVisible2(visible2 => !visible2)
    }
    const focusInput = () => {
        inputRef.current.focus()
    }


    return (
        <PageContainer>
            <div>
                {visible && <Foo />}
                <button onClick={onClick}>Foo显示/隐藏</button>
                <br></br>
                ------------------------------------------------------------
                <br></br>
                {visible2 && <Zoo ref={inputRef} />}
                <button onClick={focusInput}>父组件ref</button>
                <button onClick={onClick2}>Zoo显示/隐藏</button>
            </div>
        </PageContainer>
    )
}

export default ceshi