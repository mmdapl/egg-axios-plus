'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  // 测试接口
  async index() {
    // this.ctx.body = 'hi, ' + this.app.plugins.axios.name;
    const { ctx } = this;
    console.log(ctx.app);
    console.log(ctx.app.axios);
    // 获取参数信息
    ctx.body = {
      params: ctx.params,
      query: ctx.query,
      body: ctx.request.body,
      method: ctx.method,
    };
  }
}

module.exports = HomeController;
