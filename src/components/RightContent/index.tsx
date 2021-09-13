import { Space } from 'antd';
import { QuestionCircleOutlined, HomeOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang, useAccess, Access } from 'umi';
import Avatar from './AvatarDropdown';
import { history } from 'umi'
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  // 组件里面拿到权限
  const { canIdentity, canWelcome } = useAccess();

  const hasMenu = canIdentity || canWelcome
  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
      // onSearch={value => {
      //   console.log('input', value);
      // }}
      />
      <span
        className={styles.action}
        onClick={() => {
          history.push('/')
        }}
        style={{ color: 'white' }}
      >
        <HomeOutlined />
      </span>
      <Avatar menu={hasMenu} canIdentity={canIdentity} />
      <SelectLang className={styles.action} />
    </Space>
  );
};
export default GlobalHeaderRight;
