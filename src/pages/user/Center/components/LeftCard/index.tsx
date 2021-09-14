import React, { useState, useEffect, useRef } from 'react';
import { Skeleton, Card, Avatar, Tag, Input, message } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less'
import { await } from '_@umijs_deps@3.5.18@@umijs/deps/compiled/signale';
const { Meta } = Card;
const index = (props: any) => {
    const { loading, currentUser, currentUser: { name, description, avatar, tags }, deleteTagId, addTagContent } = props
    const [inputVisible, setinputVisible] = useState(false)
    const [inputValue, setinputValue] = useState('')
    const saveInputRef = useRef()
    // console.log(currentUser)
    const radomColor = (): string => {
        const colorArr = ["error", "success", "magenta", "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "volcano", "gold", "lime", "processing", "warning"]
        return (colorArr[Math.floor((Math.random() * 19))])
    }
    //点击删除tag，子传父
    const handleClose = (tag: any) => {
        tag && deleteTagId(tag);
    }
    //显示input
    const showInput = async () => {
        await setinputVisible(true);
        saveInputRef.current.focus();

    };
    //监听input里面的值
    const handleInputChange = (e: any) => {
        setinputValue(e.target.value);
    };
    //回车或者不聚焦事件
    const handleInputConfirm = () => {
        if (inputValue === '') {
            message.error('标签不能为空')
        } else {
            //子传父新增值
            addTagContent(inputValue)
        }
        setinputVisible(false);
        setinputValue('')
    };
    return (
        <div>
            <Card
                style={{ width: 230, marginTop: 16 }}
                className={styles.cards}
                hoverable={true}
            >
                <Skeleton loading={loading} avatar active>
                    {
                        avatar && <Meta
                            avatar={
                                <Avatar src={avatar} size={100} icon={<UserOutlined />} alt='avatar' className={styles.avatar} />
                            }
                            className={styles.simpleInformation}
                            title={name}
                            description={description}
                        />
                    }

                    {
                        tags && tags.map((item: any) => {
                            let color = radomColor();
                            return (
                                <Tag
                                    color={color}
                                    key={item.key}
                                    className={styles.tag}
                                    closable
                                    onClose={(e) => {
                                        e.preventDefault();
                                        handleClose(item)
                                    }}
                                >
                                    {item.label}
                                </Tag>
                            )
                        })
                    }
                    {inputVisible && (
                        <Input
                            ref={saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={handleInputChange}
                            onBlur={handleInputConfirm}
                            onPressEnter={handleInputConfirm}
                        />
                        // <div>123</div>
                    )}
                    {!inputVisible && (
                        <Tag onClick={showInput} className={styles.addTag}>
                            <PlusOutlined /> 添加标签
                        </Tag>
                    )}
                </Skeleton>
            </Card>
        </div>
    );
}

export default index;
