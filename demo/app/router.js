'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.all('/index', controller.home.index);

  router.get('/test', controller.home.test);
};
