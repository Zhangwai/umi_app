import React, { useState, useEffect } from 'react';
import styles from './index.less'
import LeftCard from './components/LeftCard';
import MidCard from './components/MidCard'
import RightCard from './components/RightCard'

import { connect } from 'dva';

const Center = (props: any) => {
    // console.log(props)
    const { cards: { loading, currentUser }, getCurrentUser } = props
    useEffect(() => {
        getCurrentUser()
    }, [])
    return (
        <div
            className={styles.cardsLayout}
        >
            <div
                className={styles.cardsContainer}
            >
                <LeftCard loading={loading} currentUser={currentUser} />
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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Center);
