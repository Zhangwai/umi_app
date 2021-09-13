import ProTable from '@ant-design/pro-table';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons'
import type { ProColumns } from '@ant-design/pro-table';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { connect } from 'dva';
import { Button, Tooltip, Alert, Modal, message } from 'antd';
const Todo = (props: any) => {
    // console.log(props)
    const { todoModel, getToDoList, addToDoLists, editToDoList } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    useEffect(() => {
        getToDoList()
    }, [])
    //隐藏modal
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    //表单验证通过后提交
    const handleFrom = async (params: any) => {
        const res = await addToDoLists(params)
        if (res.status === 200) {
            getToDoList()
            message.success(res.message)
            setIsModalVisible(false)
        } else {
            message.error(res.message)
        }
    }
    //改变状态
    const changeStatus = async (id: number, status: number) => {
        const res = await editToDoList({ id, status })
        if (res.status === 200) {
            getToDoList()
            message.success(res.message)
        } else {
            message.error(res.message)
        }
    }
    const columns: ProColumns<TableListItem>[] = [
        {
            title: 'ID',
            dataIndex: 'id'
        },
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            //0代办 1完成 2取消
            title: '状态',
            dataIndex: 'status',
            render: (text, record, index) => [
                text === 0 && <Alert message="待办" type="info" showIcon key={index} />,
                text === 1 && <Alert message="已完成" type="success" showIcon key={index} />,
                text === 2 && <Alert message="已取消" type="error" showIcon key={index} />,
            ]
        },
        {
            title: '修改状态',
            render: (_, record, index) => [
                record.status !== 0 && <a href="#" key={0} onClick={() => { changeStatus(record.id, 0) }}>待办 </a>,
                record.status !== 1 && <a href="#" key={1} onClick={() => { changeStatus(record.id, 1) }}>完成 </a>,
                record.status !== 2 && <a href="#" key={2} onClick={() => { changeStatus(record.id, 2) }}>取消 </a>
            ]
        },
    ];

    return (
        <PageContainer>
            <ProTable<TableListItem>
                columns={columns}
                dataSource={todoModel.todoData}
                rowKey="id"
                pagination={{
                    pageSize: 5,
                }}
                search={false}
                dateFormatter="string"
                headerTitle="待办事项列表"
                toolBarRender={() => [
                    <Button type="primary" key="primary" onClick={() => { setIsModalVisible(true) }}>
                        <PlusOutlined /> 新建
                    </Button>,
                ]}
            />
            <Modal title="添加待办事项" visible={isModalVisible} footer={null} onCancel={handleCancel}>
                <ProForm onFinish={handleFrom}>
                    <ProFormText
                        width="md"
                        name="todo"
                        label="待办事项"
                        rules={[{ required: true }]}
                    />
                </ProForm>
            </Modal>
        </PageContainer>

    )
}

const mapStateToProps = ({ todoModel }: any) => {
    return {
        todoModel
    }
}
const mapDispatchToProps = (dispatch: Function) => {
    return {
        getToDoList: (params: any) =>
            dispatch({ type: 'todoModel/fetchToDoList', payload: params }),
        addToDoLists: (params: any) =>
            dispatch({ type: 'todoModel/addToDoList', payload: params }),
        editToDoList: (params: any) =>
            dispatch({ type: 'todoModel/editToDoList', payload: params })

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Todo)