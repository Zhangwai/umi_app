import { PageContainer } from '@ant-design/pro-layout';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react'
import { fetchDashborard } from '@/services/ant-design-pro/dashborard';


const Dashboard = () => {
    //状态改变会让函数组件重新渲染
    const [data, setData] = useState({})
    useEffect(() => {
        (async () => {
            const res = await fetchDashborard()
            setData(res)
        })()
    }, [])

    return (
        <PageContainer>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="用户数"
                            value={data['user_num']}
                            precision={0}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="商品数"
                            value={data['good_num']}
                            precision={0}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="订单数"
                            value={data['order_num']}
                            precision={0}
                            valueStyle={{ color: '#aad32f' }}
                            prefix={<ArrowDownOutlined />}
                        />
                    </Card>
                </Col>
            </Row>
        </PageContainer>
    );
}

export default Dashboard;
