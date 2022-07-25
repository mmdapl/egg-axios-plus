## egg-axios-plus

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



egg-axios-plus is based on the axios plug-in, it is applicable to the basic HTTP request of the egg framework, and
satisfies the async / await operation. Welcome to use the plug-in to learn more properties and functions

### Features

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- Make [http](http://nodejs.org/api/http.html) requests from node.js
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)

### Install

```bash
$ npm install egg-axios-plus --save
```

### Usage

```js
// {app_root}/config/plugin.js
exports.axiosPlus = {
    enable: true,
    package: 'egg-axios-plus',
};
```

### Configuration

```js
// {app_root}/config/config.default.js
exports.axiosPlus = {
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

if you want to use axios in agent or app , you can set config about agent or app ,make them be ture

```javascript
exports.axiosPlus = {
    app: true,
    agent: true
}
```

see [config/config.default.js](config/config.default.js) for more detail default config.

### **Support Request**

|Type|Support| |:--:|:--:| |GET|✔| |DELETE|✔| |HEAD|✔| |OPTIONS|✔| |PUT|✔| |POST|✔| |PATCH|✔|

### Example

If you want to learn about learning the plug-in of egg-axios-plus, we strongly recommend that you learn the Axios and
Eggjs framework. As the name implies, this plug-in needs to be applied in the egg project. Let's start to write the
sample code

```javascript
// you can write request code by egg-axios-plus in controller.js or service.js

// supprt get
this.ctx.axios.get("request url", {
    // parameters object
}).then(callbackData => {
    //gain this data is only remote server response data by callback method
    console.log(callbackData);
    // add code to deal with the data from get request
}).catch(err => {
    // If there is an error in the request,it will be caught here
    console.log(err)
})

// support post
this.ctx.axios.post("request url", {
    // parameters object
}).then(callbackData => {
    console.log(callbackData);
}).catch(err => {
    console.log(err)
})
// support put,delete and other common type  request ,just write like uper code; 
```

If you don't want to use the callback function to get the result of the request in the code process, egg-axios-plus can
also support the way to synchronously get the request with **async/await** . But keep vigilant that the parent method
that used axios must be **async**

```javascript
try {
    const responseData = await this.ctx.axios.get('request url', {
        // parameters object
    });
    // add code to operate data with await 
    console.log(responseData);
} catch (err) {
    console.log(err)
}
```

### API

Requests can be made by passing the relevant config to `axios`.

#### axios(config)

```javascript
// Send a POST request
this.ctx.axios({
    method: 'post',
    url: '/user/12345',
    data: {
        firstName: 'Fred',
        lastName: 'Flintstone'
    }
});
// GET request for remote image
this.ctx.axios({
    method: 'get',
    url: 'http://bit.ly/2mTM3nY',
    responseType: 'stream'
}).then(response => {
    console.log(response);
});
```

#### Request method aliases

For convenience aliases have been provided for all supported request methods.

- this.ctx.axios.request(config)
- this.ctx.axios.get(url[, config])

- this.ctx.axios.delete(url[, config])

- this.ctx.axios.head(url[, config])

- this.ctx.axios.options(url[, config])

- this.ctx.axios.post(url[, data[, config]])

- this.ctx.axios.put(url[, data[, config]])

- this.ctx.axios.patch(url[, data[, config]])

### **NOTE**

**When using the alias methods `url`, `method`, and `data` properties don't need to be specified in config.**

### Config Defaults

You can specify config defaults that will be applied to every request.

### Global axios defaults

```javascript
const axios = this.ctx.axios;
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
```

### Custom instance defaults

```javascript
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'https://api.example.com'
});
// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
```

### Config order of precedence

Config will be merged with an order of precedence. The order is library defaults found
in [lib/defaults.js](https://github.com/axios/axios/blob/master/lib/defaults.js#L28), then `defaults` property of the
instance, and finally `config` argument for the request. The latter will take precedence over the former. Here's an
example.

```javascript
// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
const instance = axios.create();
// Override timeout default for the library
// Now all requests using this instance will wait 2.5 seconds before timing out
instance.defaults.timeout = 2500;
// Override timeout for this request as it's known to take a long time
instance.get('/longRequest', {
    timeout: 5000
});
```

more example please visit https://github.com/axios/axios or contact with [Taylor](https://github.com/mmdapl)

### Questions & Suggestions

Please open an issue [here](https://github.com/mmdapl/egg-axios-plus/issues).

### Links

[egg-axios-plus中文使用手册](README.zh_CN.md)

[Axios中文说明](https://www.kancloud.cn/yunye/axios/234845)

[example code](example)

### Author

[Rong姐姐好可爱](https://github.com/mmdapl)

### License

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
