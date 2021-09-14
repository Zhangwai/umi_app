import { Request, Response } from 'express';
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;

/**
 * 当前用户的权限，如果为空代表没登录
 * current user access， if is '', user need login
 * 如果是 pro 的预览，默认是有权限的
 */
const getAccess = () => {
  return access;
};
let access = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site' ? 'admin' : '';
//登录用户信息
let data = {
  name: '游客',
  identity: '',
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  userid: '00000001',
  email: 'antdesign@alipay.com',
  signature: '海纳百川，有容乃大',
  title: '交互专家',
  group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
  description: '我是一个小游客',
  tags: [
    {
      key: '0',
      label: '很有想法的',
    },
    {
      key: '1',
      label: '专注设计',
    },
    {
      key: '2',
      label: '辣~',
    },
    {
      key: '3',
      label: '大长腿',
    },
    {
      key: '4',
      label: '川妹子',
    },
    {
      key: '5',
      label: '海纳百川',
    },
  ],
  notifyCount: 12,
  unreadCount: 11,
  country: 'China',
  access: getAccess(),
  geographic: {
    province: {
      label: '浙江省',
      key: '330000',
    },
    city: {
      label: '杭州市',
      key: '330100',
    },
  },
  address: '西湖区工专路 77 号',
  phone: '0752-268888888',
}



// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': (req: Request, res: Response) => {
    const { headers } = req;
    //请求头没有带token都会报错
    if (!getAccess() && headers.authorization === 'Bearer') {
      res.status(401).send({
        data: {
          isLogin: false,
        },
        errorCode: '401',
        errorMessage: '请先登录！',
        success: true,
      });
      return;
    }
    res.send({
      success: true,
      data,
    });
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  //登录
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && username === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      data.access = 'admin';
      data.name = '游客.01';
      data.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
      data.identity = 'admin';
      data.description = '我是一个小游客';
      return;
    }
    if (password === 'ant.design' && username === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      access = 'user';
      data.access = 'user';
      data.name = '游客.02';
      data.avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
      data.identity = 'user';
      data.description = '我是一个小游客';
      return;
    }
    if (password === '123' && username === 'datou') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'datou, I am token, happy everyday!!!',
      });
      access = 'datou';
      data.access = 'datou';
      data.name = '究极管理员大头';
      data.avatar = '/laotou.svg';
      data.identity = 'maxAdmin';
      data.description = '这孩子黑虎头似的脸上，生着一对铜铃一般的大眼睛，十分精神。';
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      access = 'admin';
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
    access = 'guest';
  },
  //退出登录
  'POST /api/login/outLogin': (req: Request, res: Response) => {
    access = '';
    res.send({ data: {}, success: true });
  },
  //删除tags
  "POST /api/tag/delete": (req: Request, res: Response) => {
    const { key } = req.body;
    let isSend = false;
    data.tags.forEach((item, index) => {
      if (item.key === key) {
        data.tags.splice(index, 1);
        isSend = true;
        res.status(204).send({
          status: 204,
          message: '删除成功',
          success: { key }
        });
      }
    })
    if (!isSend) {
      res.status(404).send({
        status: 404,
        error: 'Not Found',
        message: '找不到这个tag',
      });
    }
  },
  //添加tags
  "POST /api/tag/add/": (req: Request, res: Response) => {
    const { label } = req.body;
    let isAgain = false;
    let tooLong = false;
    if (label.length > 12 || label.length === 0) {
      tooLong = true;
      res.status(400).send({
        status: 400,
        error: 'error',
        message: 'tag内容过长或者无内容',
      })
    }
    if (!tooLong) {
      data.tags.forEach((item) => {
        if (item.label === label) {
          isAgain = true;
          res.status(400).send({
            status: 400,
            error: 'error',
            message: 'tag内容重复',
          })
        }
      })
    }

    if ((!isAgain) && (!tooLong)) {
      const id = data.tags.length >= 1 ? Number(data.tags[data.tags.length - 1]['key']) + 1 : 0;
      data.tags.push({ key: id.toString(), label });
      res.status(201).send({
        status: 201,
        success: 'success',
        message: 'tag添加成功'
      })
    }
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user', success: true });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Forbidden',
      message: 'Forbidden',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};
