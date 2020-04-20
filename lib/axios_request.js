'use strict';
const axios = require('axios');
const { merge: deepMerge } = require('lodash');

/**
 * @description method enclosure based on axios
 * @param {context} app app context of egg
 * @author Taylor
 * @github https://github.com/mmdapl
 */

function EggAxios(app) {
  this.app = app;
  return this.init(app);
}

/**
 * @description axios prototype default config init load
 * @author Taylor
 * @github https://github.com/mmdapl
 */

EggAxios.prototype.init = function(app) {
  // 默认配置
  const defaultConfig = {
    headers: {
      common: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
    // default 5 seconds timeout
    timeout: 5000,
  };
  // axios对象初始化配置合并
  axios.defaults = deepMerge(axios.defaults, defaultConfig, app.config.axiosPlus);
  app.logger.info(`[egg-axios-plus] default configs: ${JSON.stringify(axios.defaults)}`);
  // 获取插件的配置
  const config = app.config.axiosPlus;
  //  添加请求拦截器
  axios.interceptors.request.use(config.requestInterceptorsHandler || function(config) {
    app.coreLogger.debug(`[egg-axios-plus] send request, baseURL: ${JSON.stringify(config.baseURL)}, url: ${config.url}, method: ${config.method}, data: ${JSON.stringify(config.data)}, headers: ${JSON.stringify(config.headers)}`);
    return config;
  }, config.requestInterceptorsErrorHandler || function(error) {
    app.coreLogger.error(`[egg-axios-plus] send request error, ${error.message}`);
    return Promise.reject(error);
  });
  // 响应拦截器
  axios.interceptors.response.use(config.responseInterceptorsHandler || function(response) {
    app.coreLogger.debug(`[egg-axios-plus] receive response, data: ${JSON.stringify(response.data)}, status: ${response.status}, headers: ${JSON.stringify(response.headers)}`);
    if (response.config && (response.config.method.toUpperCase() === 'HEAD' || response.config.method.toUpperCase() === 'options')) {
      return response;
    }
    return response.data;

  }, config.responseInterceptorsErrorHandler || function(error) {
    app.coreLogger.error(`[egg-axios-plus] receive response error, ${error.message}`);
    return Promise.reject(error);
  });

  // 返回axios对象
  return axios;
};

module.exports = EggAxios;
