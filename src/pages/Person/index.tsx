import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAllPerson } from '@/services/ant-design-pro/api';
import { connect } from 'dva';
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

console.log(connect)
const Person = (props: any) => {
    
    const personList = async () => {
        const data = await getAllPerson();
        return { data }
    }
    return (
        <PageContainer>
            <ProTable<GithubIssueItem>
                columns={columns}
                request={async (params = {}) =>
                    personList()
                }
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
export default Person;
// export default connect(mapStateToProps, mapDispatchToProps)(Person);
