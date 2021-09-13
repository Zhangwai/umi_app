import React from 'react';
import { PageContainer, SettingDrawer } from '@ant-design/pro-layout';
import { Button, Descriptions, Result, Avatar, Space, Statistic } from 'antd';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';
const content = (
    <Descriptions size="middle" column={2}>
        <Descriptions.Item label="创建人">张三</Descriptions.Item>
        <Descriptions.Item label="联系方式">
            <a>421421</a>
        </Descriptions.Item>
        <Descriptions.Item label="创建时间">2017-01-10</Descriptions.Item>
        <Descriptions.Item label="更新时间">2017-10-10</Descriptions.Item>
        <Descriptions.Item label="备注">中国浙江省杭州市西湖区古翠路</Descriptions.Item>
    </Descriptions>
);
const Settings = () => {
    return (
        <PageContainer
            content={content}
            tabList={[
                {
                    tab: '基本信息',
                    key: 'base',
                },
                {
                    tab: '详细信息',
                    key: 'info',
                },
            ]}
            // extraContent={
            //     <Space size={24}>
            //         <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
            //         <Statistic title="Unmerged" value={93} suffix="/ 100" />
            //     </Space>
            // }
            header={{
                title: '',
                breadcrumb: {},
            }}
        >
            <div
                style={{
                    height: '100vh',
                }}
            >
                <Result
                    status="404"
                    style={{
                        height: '100%',
                        background: '#fff',
                    }}
                    title="Hello World"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary">Back Home</Button>}
                />
            </div>
        </PageContainer>
    );
}

export default Settings;
