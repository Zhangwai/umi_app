import React, { useState, useEffect } from 'react';
import styles from './index.less'
import LeftCard from './components/LeftCard';
import MidCard from './components/MidCard'
import RightCard from './components/RightCard'

import { connect } from 'dva';
import { message } from '_antd@4.16.13@antd';

const Center = (props: any) => {
    // console.log(props)
    const { cards: { loading, currentUser }, getCurrentUser, deleteTagById, addTagContent } = props
    useEffect(() => {
        getCurrentUser()
    }, []);
    const getTagId = (tag: any) => {
        console.log({ 'key': tag['key'] })
        deleteTagById({ 'key': tag['key'] })
        getCurrentUser()
    }
    const getTagContent = (content: any) => {
        if (content.length > 12) {
            message.error('标签内容超过12个字符')
        } else {
            const data = { 'label': content }
            addTagContent(data)
            getCurrentUser()
        }
    }
    return (
        <div
            className={styles.cardsLayout}
        >
            <div
                className={styles.cardsContainer}
            >
                <LeftCard loading={loading} currentUser={currentUser} deleteTagId={getTagId} addTagContent={getTagContent} />
                <MidCard loading={loading} currentUser={currentUser} />
                <RightCard loading={loading} currentUser={currentUser} />
            </div>


        </div>
    );
}

const mapStateToProps = ({ cards }: any) => {
    return {
        cards
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getCurrentUser: (params: any) =>
            dispatch({ type: 'cards/fetchCurrentUser', payload: params }),
        deleteTagById: (params: any) => {
            dispatch({ type: 'cards/deleteTagsById', payload: params })
        },
        addTagContent: (params: any) => {
            dispatch({ type: 'cards/addTagContent', payload: params })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Center);
