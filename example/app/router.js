'use strict';

/**
 * 接口路由
 */
module.exports = app => {
  const { router, controller } = app;
  router.all('/index', controller.home.index);
  router.get('/test', controller.home.test);
};
