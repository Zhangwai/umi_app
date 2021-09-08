import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
const columns: ProColumns<GithubIssueItem>[] = [
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        hideInSearch: true,
    },
];

const Person = (props: any) => {
    // console.log(props)
    const { personModel, getPerson } = props
    useEffect(() => {
        getPerson()
    }, [])
    // console.log('render')
    return (
        <PageContainer>
            <ProTable<GithubIssueItem>
                columns={columns}
                dataSource={personModel.person}
                rowKey="id"
                search={{
                    labelWidth: 'auto',
                }}
                form={{
                    ignoreRules: false,
                }}
                pagination={{
                    pageSize: 5,
                }}
                dateFormatter="string"
                headerTitle="高级表格"
                toolBarRender={() => [
                    <Button key="button" icon={<PlusOutlined />} type="primary">
                        新建
                    </Button>,
                ]}
            />
        </PageContainer>
    )
}

const mapStateToProps = ({ personModel }: any) => {
    return {
        personModel
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getPerson: (params: any) =>
            dispatch({ type: 'personModel/fetchAllPerson', payload: params }),
    }
}
// export default Person;
export default connect(mapStateToProps, mapDispatchToProps)(Person);
