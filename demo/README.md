# demo

egg-axios-plus插件在eggjs框架下的使用示例

## QuickStart
### 基础用法

```js
  async test() {
    const { ctx } = this;
    // -----------------------------get请求示例----------------------------------
    const getRes = await ctx.axios({
      url: 'http://127.0.0.1:520/index',
      method: 'get',
      params: {
        key: 'get request',
      },
    });

    // -----------------------------post请求-------------------------------------
    const postRes = await ctx.axios({
      url: 'http://127.0.0.1:520/index',
      method: 'get',
      data: {
        key: 'post request',
      },
    });
    // -----------------------------delete请求-----------------------------------
    const deleteRes = await ctx.axios({
      url: 'http://127.0.0.1:520/index',
      method: 'delete',
      data: {
        key: 'post request',
      },
    });
    // -----------------------------put请求---------------------------------------
    const putRes = await ctx.axios({
      url: 'http://127.0.0.1:520/index',
      method: 'put',
      data: {
        key: 'put request',
      },
    });

    // 输出
    ctx.body = {
      getRequestRes: getRes,
      postRequestRes: postRes,
      deleteRequestRes: deleteRes,
      putRequestRes: putRes,
    };
    // 关于回调及更多方法的api方法使用，可以参照https://www.kancloud.cn/yunye/axios/234845
  }
```

### 接口地址
```js
//模拟基础的get、put、post、delete的请求
router.all('/index', controller.home.index);
// 简单测试egg-axios-plus的应用
router.get('/test', controller.home.test);
```

### 请求效果
```json
// 20200420221205
// Taylor
// http://127.0.0.1:520/test
{
  "getRequestRes": {
    "params": {
    },
    "query": {
      "key": "get request"
    },
    "body": {
    },
    "method": "GET"
  },
  "postRequestRes": {
    "params": {
    },
    "query": {
    },
    "body": {
      "key": "post request"
    },
    "method": "GET"
  },
  "deleteRequestRes": {
    "params": {
    },
    "query": {
    },
    "body": {
      "key": "post request"
    },
    "method": "DELETE"
  },
  "putRequestRes": {
    "params": {
    },
    "query": {
    },
    "body": {
      "key": "put request"
    },
    "method": "PUT"
  }
}
```

### 注意事项
- 解决模拟接口跨域问题
```js
// 配合egg-cors使用
config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};
```
- 关闭csrf校验
```js
// 关闭csrf功能
config.security = {
    csrf: {
        // 关闭csrf
        enable: false,
        ignoreJSON: true,
    },
    // 白名单
    // domainWhiteList: [ 'http://localhost:8848' ],
};
```

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:520/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org