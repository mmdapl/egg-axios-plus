# egg-axios-plus

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-axios-plus.svg?style=flat-square

[npm-url]: https://npmjs.org/package/egg-axios-plus

[travis-image]: https://img.shields.io/travis/eggjs/egg-axios-plus.svg?style=flat-square

[travis-url]: https://github.com/mmdapl/egg-axios-plus

[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-axios-plus.svg?style=flat-square

[codecov-url]: https://codecov.io/github/eggjs/egg-axios-plus?branch=master

[david-image]: https://img.shields.io/david/eggjs/egg-axios-plus.svg?style=flat-square

[david-url]: https://david-dm.org/eggjs/egg-axios-plus

[snyk-image]: https://snyk.io/test/npm/egg-axios-plus/badge.svg?style=flat-square

[snyk-url]: https://snyk.io/test/npm/egg-axios-plus

[download-image]: https://img.shields.io/npm/dm/egg-axios-plus.svg?style=flat-square

[download-url]: https://npmjs.org/package/egg-axios-plus


egg-axios-plus是基于axios模块开发egg插件，能够很好的应用到eggjs框架下的基础http请求，满足日常开发中常见的async/awiat操作，支持ES6语法规范和回调函数使用，用户可以在promise、回调函数等多种方式下进行插件使用；欢迎使用egg-axios-plus插件去了解更多的属性及方法，祝生活愉快~

### 特点

- 从浏览器中创建[XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) 请求
- 支持nodejs发送[http](http://nodejs.org/api/http.html)请求
- 支持[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API方法
- 支持请求拦截器、响应拦截器自定义
- 自动转换请求和响应数据
- 取消请求
- 自动转换json格式数据
- 客户端防止[XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)攻击

### 安装

```bash
## 插件下载
$ npm install egg-axios-plus --save
```

### 使用

#### 启用插件

```js
// {app_root}/config/plugin.js
exports.axiosPlus = {
    enable: true,
    package: 'egg-axios-plus',
};
```

#### 默认配置

```js
// {app_root}/config/config.default.js
exports.axios = {
// can set more config in headers,like token,references and so on
    headers: {
        common: {
            'Content-Type': 'application/json; charset=UTF-8',
            // 添加认证【例如】，也可以在请求拦截器中修改具体的request config
            // 'Authorization':'19980115_520' // 不要问我19980115是什么，当然是女朋友生日呀！！！
        },
        // 可以设置请求头等属性
    },
    // 定义请求拦截器处理方法【可选】
    // requestInterceptorsHandler: config => {
    //   // 请求之前的配置信息
    //   // 当该字段【函数】不存在是，默认如下：
    //   app.coreLogger.debug(`[egg-axios-plus] send request, baseURL: ${JSON.stringify(config.baseURL)}, url: ${config.url}, method: ${config.method}, data: ${JSON.stringify(config.data)}, headers: ${JSON.stringify(config.headers)}`);
    //   return config;
    // },
    // requestInterceptorsErrorHandler: error => {
    //   // 请求之后发生的错误信息
    //   // 当该字段【函数】不存在是，默认如下：
    //   app.coreLogger.error(`[egg-axios-plus] send request error, ${error.message}`);
    //   return Promise.reject(error);
    // },
    // // 定义axios响应拦截器处理方法【可选】
    // responseInterceptorsHandler: response => {
    //   // response 响应结果
    //   // 当该字段【函数】不存在是，默认如下：
    //   app.coreLogger.debug(`[egg-axios-plus] receive response, data: ${JSON.stringify(response.data)}, status: ${response.status}, headers: ${JSON.stringify(response.headers)}`);
    //   if (response.config && (response.config.method.toUpperCase() === 'HEAD' || response.config.method.toUpperCase() === 'options')) {
    //     return response;
    //   }
    //   return response.data;
    // },
    // responseInterceptorsErrorHandler: error => {
    //   // 接口响应失败的错误结果
    //   // 当该字段【函数】不存在是，默认如下：
    //   app.coreLogger.error(`[egg-axios-plus] receive response error, ${error.message}`);
    //   return Promise.reject(error);
    // },
    timeout: 5000, // 默认请求超时
    app: true, // 在app.js上启动加载
    agent: false, // 在agent.js上启动加载
};
```

- headers 接口请求头数据
- timeout: 5000, // 默认请求超时
- app: true, // 在app.js上启动加载
- agent: false, // 在agent.js上启动加载
- requestInterceptors 请求拦截器

```js
// 定义请求拦截器处理方法【可选】
requestInterceptorsHandler => {
    // 请求之前的配置信息
    // 当该字段【函数】不存在是，默认如下：
    app.coreLogger.debug(`[egg-axios-plus] send request, baseURL: ${JSON.stringify(config.baseURL)}, url: ${config.url}, method: ${config.method}, data: ${JSON.stringify(config.data)}, headers: ${JSON.stringify(config.headers)}`);
    // 注意返回处理后的请求配置
    return config;
}, requestInterceptorsErrorHandler => {
    // 请求之后发生的错误信息
    // 当该字段【函数】不存在是，默认如下：
    app.coreLogger.error(`[egg-axios-plus] send request error, ${error.message}`);
    return Promise.reject(error);
}
```

- responseInterceptors 响应拦截器

```javascript
  // 定义axios响应拦截器处理方法【可选】
responseInterceptorsHandler: response => {
    // response 响应结果
    // 当该字段【函数】不存在是，默认如下：
    app.coreLogger.debug(`[egg-axios-plus] receive response, data: ${JSON.stringify(response.data)}, status: ${response.status}, headers: ${JSON.stringify(response.headers)}`);
    if (response.config && (response.config.method.toUpperCase() === 'HEAD' || response.config.method.toUpperCase() === 'options')) {
        return response;
    }
    // 注意返回处理后的响应数据
    return response.data;
}, responseInterceptorsErrorHandler => {
    // 接口响应失败的错误结果
    // 当该字段【函数】不存在是，默认如下：
    app.coreLogger.error(`[egg-axios-plus] receive response error, ${error.message}`);
    return Promise.reject(error);
}
```

如果你希望在项目启动的时候的不同阶段去挂载axios对象到context上下文中，你可以配置app或者agent参数。建议了解一下[eggjs声明周期](https://eggjs.org/zh-cn/advanced/loader.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)

```javascript
exports.axios = {
    app: true, // 在app.js文件中实现axios对象的挂载
    agent: true // 在agent.js文件中实现axios对象的挂载
}
```

注意：由于eggjs框架中，agent.js优于app.js文件进行加载，所以当agent.js设置true时，不建议app仍设置true，即保证egg-axios-plus插件中axios对象在app.js或者agent.js任一文件中实现挂载即可，避免冲突；

see [config/config.default.js](config/config.default.js) for more detail.

## **支持请求类型**

|类型|是否支持| |:--:|:--:| |GET|✔| |DELETE|✔| |HEAD|✔| |OPTIONS|✔| |PUT|✔| |POST|✔| |PATCH|✔|

## Example

如果您想学习有关egg-axios-plus插件的知识，我们强烈建议您学习Axios和Eggjs框架。 顾名思义，该插件需要在egg项目中应用。 让我们开始编写示例代码

```javascript
// 您可以通过egg-axios-plus在controller.js或service.js中编写请求代码
// 支持 get 请求
this.ctx.axios.get("request url", {
//  parameters object
}).then(callbackData => {
    //gain this data is only remote server response data by callback method
    console.log(callbackData);
    // add code to deal with the data from get request
}).catch(err => {
    // If there is an error in the request,it will be caught here
    console.log(err)
})

// 支持 post 请求
this.ctx.axios.post("request url", {
    // parameters object
}).then(callbackData => {
    console.log(callbackData);
}).catch(err => {
    console.log(err)
})
// 支持put，delete和其他常见类型的请求，就像uber代码一样编写；
```

如果您不想在代码处理过程中使用回调函数获取请求的结果，egg-axios-plus也可以支持通过** async / await **同步获取请求的方式。 但是请保持警惕，使用axios的父方法必须是“异步”的

```javascript
try {
    const responseData = await this.ctx.axios.get('request url', {
        // parameters object
    });
    // 添加代码去处理同步获取的数据结果
    console.log(responseData);
} catch (err) {
    console.log(err);
}
```

### API

可以通过将相关配置传递给`axios`来发出请求。

#### axios(config)

```javascript
// 发送post请求，
this.ctx.axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
});
// get请求远程图像
this.ctx.axios({
    method: 'get',
    url: 'http://bit.ly/2mTM3nY',
    responseType: 'stream'
}).then(response => {
    console.log(response);
});
```

#### axios请求方法别名

为了方便起见，已为所有受支持的请求方法提供了别名。

- this.ctx.axios.request(config)
- this.ctx.axios.get(url[, config])

- this.ctx.axios.delete(url[, config])

- this.ctx.axios.head(url[, config])

- this.ctx.axios.options(url[, config])

- this.ctx.axios.post(url[, data[, config]])

- this.ctx.axios.put(url[, data[, config]])

- this.ctx.axios.patch(url[, data[, config]])

**使用别名方法`url`，`method`和`data`属性时，无需在config中指定。**

#### 并发

处理并发请求的助手函数

```js
this.ctx.axios.all(iterable)
this.ctx.axios.spread(callback)
```

#### 实例方法

以下是可用的实例方法。指定的配置将与实例的配置合并

```bash
this.ctx.axios
#request(config)
this.ctx.axios
#get(url[, config])
this.ctx.axios
#delete(url[, config])
this.ctx.axios
#head(url[, config])
this.ctx.axios
#post(url[, data[, config]])
this.ctx.axios
#put(url[, data[, config]])
this.ctx.axios
#patch(url[, data[, config]])
```

#### 请求配置

这些是创建请求时可以用的配置选项。只有 url 是必需的。如果没有指定 method，请求将默认使用 get 方法。

```text
{
  // `url` 是用于请求的服务器 URL
  url: '/user',
  // `method` 是创建请求时使用的方法
  method: 'get',
  // 默认是 get
  // `baseURL` 将自动加在 `url` 前面,除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',
  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
    function
    (data)
    {
      // 对 data 进行任意转换处理

      return
      data
      ;
    }
  ],
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [
    function(data){
      // 对 data 进行任意转换处理
      return data;
    }
  ],
  // `headers` 是即将被发送的自定义请求头
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },
  // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function
  (params) {
  return
  Qs.stringify(params, {
  arrayFormat: 'brackets'
})
}
,
// `data` 是作为请求主体被发送的数据
// 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
// 在没有设置 `transformRequest` 时，必须是以下类型之一：
// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
// - 浏览器专属：FormData, File, Blob
// - Node 专属： Stream
data: {
firstName: 'Fred'
},
// `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
// 如果请求话费了超过 `timeout` 的时间，请求将被中断
timeout: 1000,
// `withCredentials` 表示跨域请求时是否需要使用凭证
withCredentials: false, // 默认的

// `adapter` 允许自定义处理请求，以使测试更轻松
// 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
adapter: function (config) {
/* ... */
},
// `auth` 表示应该使用 HTTP 基础验证，并提供凭据
// 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
auth: {
username: 'janedoe',
password: 's00pers3cret'
},
// `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
responseType: 'json', // 默认的

// `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
xsrfCookieName: 'XSRF-TOKEN', // default

// `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的

// `onUploadProgress` 允许为上传处理进度事件
onUploadProgress:

function (progressEvent) {
// 对原生进度事件的处理
},
// `onDownloadProgress` 允许为下载处理进度事件
onDownloadProgress: function (progressEvent) {
// 对原生进度事件的处理
},
// `maxContentLength` 定义允许的响应内容的最大尺寸
maxContentLength: 2000,
// `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
validateStatus: function (status) {
return status >= 200 && status < 300; // 默认的
},
// `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
// 如果设置为0，将不会 follow 任何重定向
maxRedirects: 5, // 默认的

// `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
// `keepAlive` 默认没有启用
httpAgent: new http.Agent({keepAlive: true}),
httpsAgent:
new https.Agent({keepAlive: true}),
// 'proxy' 定义代理服务器的主机名称和端口
// `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
// 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
proxy
: {
host: '127.0.0.1',
port: 9000,
auth:: {
username: 'mikeymike',
password:
'rapunz3l'
}
},
// `cancelToken` 指定用于取消请求的 cancel token
// （查看后面的 Cancellation 这节了解更多）
cancelToken: new CancelToken(function (cancel) {
})
}
```

#### 默认配置

您可以指定将应用于每个请求的配置默认值。

#### 全局默认配置

```javascript
const axios = this.ctx.axios;
// 配置基础请求路径，后续请求地址可以采用相对路径；
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

```javascript
// 使用库提供的配置默认值创建实例
//此时，超时配置值为0，这是库的默认值
const instance = axios.create();
//默认情况下，库的超时超时
//现在使用此实例的所有请求将等待2.5秒，然后再超时
instance.defaults.timeout = 2500;
//覆盖此请求的超时时间，因为它需要花费很长时间
instance.get('/longRequest', {
    timeout: 5000
});
```

更多示例，请访问[axios示例代码](https://github.com/mmdapl/egg-axios-plus/example)

### 问题与建议

如果在使用过程中有任何问题，请在 [issues](https://github.com/mmdapl/egg-axios-plus) 留言，欢迎讨论！

### 链接

[egg-axios-plus英文使用手册](README.md)

[Axios中文说明](https://www.kancloud.cn/yunye/axios/234845)

[example code](example)

### 作者

[Rong姐姐好可爱](https://github.com/mmdapl)

### 证书

```text
MIT License

Copyright (c) 2022 142vip FairySister Rong姐姐好可爱

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```