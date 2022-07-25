'use strict';
/**
 * @description load plugin egg-axios-plus
 * @author Taylor
 * @github https://github.com/mmdapl
 */
const loader = require('./lib/axios_loader.js');
module.exports = async agent => {
  const startTime = new Date().getTime();
  // Combined with egg framework last configuration, load egg-axios-plus
  const { axiosPlus } = agent.config;
  if (axiosPlus.agent) {
    await loader(agent);
    // 计算启动耗时
    const intervalTime = new Date().getTime() - startTime;
    agent.logger.info(
      `[egg-axios-plus] : The plugin took a total of ${intervalTime}ms to start in agent.js , Thank you for using egg-axios-plus and wish you a happy life`
    );
  }
};
