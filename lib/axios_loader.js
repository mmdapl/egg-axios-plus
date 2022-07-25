'use strict';

const Axios = require('./axios_request.js');
const axiosInstance = Symbol('egg#egg-axios-plus');
module.exports = app => {
  // config axios object to new
  if (!this[axiosInstance]) {
    this[axiosInstance] = new Axios(app);
  }
  app.axios = this[axiosInstance];
};
