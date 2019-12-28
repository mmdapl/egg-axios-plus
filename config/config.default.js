'use strict';

/**
 * egg-axios-plus default config
 * @member Config#axios
 * @property {String} SOME_KEY - some description
 */
exports.axios = {
  // can set more config in headers,like token,references and so on
  headers: {
    common: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
  },
  timeout: 5000,
  app:true,
  agent:false
};
