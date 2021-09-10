import React, { useCallback, useState, useEffect } from 'react';
import { LogoutOutlined, SettingOutlined, UserOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin, Badge } from 'antd';
import { history, useModel } from 'umi';
import { stringify } from 'querystring';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { outLogin } from '@/services/ant-design-pro/api';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { connect } from 'dva';
export type GlobalHeaderRightProps = {
  menu?: boolean;
  todoModel?: Array<object>;
};

/**
 * 退出登录，并且将当前的 url 保存
 */
const loginOut = async () => {
  await outLogin();
  const { query = {}, pathname } = history.location;
  const { redirect } = query;
  // Note: There may be security issues, please note
  if (window.location.pathname !== '/user/login' && !redirect) {
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: pathname,
      }),
    });
  }
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = (props) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { menu,todoModel, todoModel: { todoData },dispatch } = props;
  useEffect(() => {
    //默认拿到头像旁边的小点
    dispatch({
      type: 'todoModel/fetchToDoList',
      payload: null
    })
  }, [])
  let count = todoData.filter(item => item.status === 0).length;
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
        loginOut();
        return;
      }
      if (key === 'todo') {
        history.push(`/${key}`);
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.name) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}
      <Menu.Item key="todo">
        <UnorderedListOutlined />
        待办事项
        <Badge count={count} overflowCount={99} offset={[10, -5]} />
      </Menu.Item>
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />{/* 头像 */}
        <span className={`${styles.name} anticon`}>{currentUser.name}<Badge count={count} dot={true} offset={[5, 0]} /></span>{/* 名字 */}
      </span>
    </HeaderDropdown>
  );
};

export default connect(({ todoModel }: any) => ({ todoModel }))(AvatarDropdown);
