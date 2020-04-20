'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.all('/', controller.home.index);
};
