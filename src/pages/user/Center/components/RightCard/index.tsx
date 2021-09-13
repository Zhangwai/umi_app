import React from 'react';
import { Card, Avatar } from 'antd';
import styles from './index.less'
const { Meta } = Card;
const index = (props:any) => {
    const { loading, currentUser } = props
    return (
        <div>
            <Card style={{ width: 280, marginTop: 16 }} loading={loading} className={styles.cards} hoverable={true}>
                <Meta
                    avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        </div>
    );
}

export default index;
