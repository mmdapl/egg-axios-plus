'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      params: ctx.params,
      query: ctx.query,
      body: ctx.request.body,
      method: ctx.method,
    };

  }
  // 实现egg-axios-plus的使用
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
}

module.exports = HomeController;
