import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '大爷集团体验技术部出品',
  });
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'datou',
          title: '大头',
          href: '#',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Zhangwai',
          blankTarget: true,
        },
        {
          key: 'welcome',
          title: '欢迎关注',
          href: 'https://github.com/Zhangwai/umi_app',
          blankTarget: true,
        },
      ]}
    />
  );
};
