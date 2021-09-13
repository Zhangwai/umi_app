import React, { useState, useEffect } from 'react';
import { Skeleton, Card, Avatar, Tag } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.less'
const { Meta } = Card;
const index = (props: any) => {
    const { loading, currentUser, currentUser: { name, description, avatar, tags } } = props
    console.log(currentUser)
    const radomColor = (): string => {
        const colorArr = ["error", "success", "magenta", "pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "volcano", "gold", "lime", "processing", "warning"]
        return (colorArr[Math.floor((Math.random() * 19))])
    }
    const handleClose = (tag:any) => {
        const id = tag.key;
        console.log(id)
    }
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
                </Skeleton>
            </Card>
        </div>
    );
}

export default index;
