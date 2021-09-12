export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/account',
    component: '../components/AccountLayout',
    layout: false,
    routes: [
      {
        name: 'account.center',
        path: '/account/center',
        component: './user/Center',
      },
      {
        name: 'account.settings',
        path: '/account/settings',
        component: './user/Settings',
      },
      {
        component: './404',
      },
    ]
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin', //来自 src/access.ts 的 access函数
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/person',
    name: 'person',
    access: 'canIdentity',
    icon: 'UserOutlined',
    component: './Person'
  },
  {
    path: '/todo',
    name: 'todo',
    access: 'canIdentity',
    icon: 'CalendarOutlined',
    component: './Todo'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    access: 'canIdentity',
    icon: 'BarChartOutlined',
    component: './Dashboard'
  },
  {
    path: '/ceshi',
    name: 'ceshi',
    access: 'canIdentity',
    icon: 'icon-ceshi',
    component: './Ceshi'
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
