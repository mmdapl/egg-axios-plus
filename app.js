'use strict';

const loader = require('./lib/axios_loader.js');
/**
 * @description load plugin egg-axios-plus
 * @author Taylor
 * @github https://github.com/mmdapl
 */

module.exports = async app => {
  // Combined with egg framework last configuration, load egg-axios-plus
  const { axiosPlus } = app.config;
  const startTime = new Date().getTime();
  if (axiosPlus.app) {
    await loader(app);
    // 计算启动耗时
    const intervalTime = new Date().getTime() - startTime;

    app.logger.info(`[egg-axios-plus] : The plugin took a total of ${intervalTime}ms to start in app.js , Thank you for using egg-axios-plus and wish you a happy life`);
  }
};

