'use strict';
const axios = require('axios');
const { merge: deepMerge } = require('lodash');
const queryStr = require('querystring');
const urlTools = require('url');

/**
 * @description method enclosure based on axios
 * @param {context} app app context of egg
 * @author Taylor
 * @github https://github.com/mmdapl
 */

function EggAxios(app) {
  this.app = app;
  this.init();
}

/**
 * @description method enclosure based on axios
 * @param {String} url axios request url
 * @param {String|Object|Array} params axios request parameters,it can be string ,object ,array and so on
 * @author Taylor
 * @github https://github.com/mmdapl
 */

function requestUrlSplice(url, params) {
  if (!url || !params) {
    return [ url, params ];
  }
  if (typeof params !== 'object') {
    return [ url, params ];
  }
  const newParams = {};
  // get all params Array by for loop
  for (const key in params) {
    const reg = new RegExp(`:${key}`, 'g');
    if (reg.test(url)) {
      url = url.replace(reg, params[key]);
    } else {
      newParams[key] = params[key];
    }
  }
  return [ url, newParams ];
}
/**
 * @description axios prototype default config init load
 * @author Taylor
 * @github https://github.com/mmdapl
 */

EggAxios.prototype.init = function() {
  const self = this;
  const defaultConfig = {
    headers: {
      common: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    },
    // default 5 seconds timeout
    timeout: 5000,
  };

  axios.defaults = deepMerge(axios.defaults, defaultConfig, self.app.config.http);

  self.app.logger.info(`[egg-axios-plus] default configs: ${JSON.stringify(axios.defaults)}`);

  axios.interceptors.request.use(function(config) {
    self.app.coreLogger.debug(`[egg-axios-plus] send request, baseURL: ${JSON.stringify(config.baseURL)}, url: ${config.url}, method: ${config.method}, data: ${JSON.stringify(config.data)}, headers: ${JSON.stringify(config.headers)}`);
    return config;
  }, function(error) {
    self.app.coreLogger.error(`[egg-axios-plus] send request error, ${error.message}`);
    return Promise.reject(error);
  });

  axios.interceptors.response.use(function(response) {
    self.app.coreLogger.debug(`[egg-axios-plus] receive response, data: ${JSON.stringify(response.data)}, status: ${response.status}, headers: ${JSON.stringify(response.headers)}`);
    if (response.config && (response.config.method.toUpperCase() === 'HEAD' || response.config.method.toUpperCase() === 'options')) {
      return response;
    }
    return response.data;

  }, function(error) {
    self.app.coreLogger.error(`[egg-axios-plus] receive response error, ${error.message}`);
    return Promise.reject(error);
  });
};


// support common request type,like delete,get,head,options
for (const method of [ 'delete', 'get', 'head', 'options' ]) {
  EggAxios.prototype[method] = function(url, data, config) {
    [ url, data ] = requestUrlSplice(url, data);
    const urlParse = urlTools.parse(url);
    if (urlParse.query) {
      data = Object.assign(queryStr.parse(urlParse.query), data);
    }
    if (data && typeof data === 'object') {
      url = `${urlParse.protocol}//${urlParse.host}${urlParse.pathname}?${queryStr.stringify(data)}`;
    }
    return axios[method](url, config);
  };
}

// support common request type,like post,put,patch
for (const method of [ 'post', 'put', 'patch' ]) {
  EggAxios.prototype[method] = function(url, data, config) {
    [ url, data ] = requestUrlSplice(url, data);
    return axios[method](url, data, config);
  };
}

module.exports = EggAxios;
