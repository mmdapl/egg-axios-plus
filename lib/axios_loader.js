'use strict';

const Axios = require('./axios_request.js');
module.exports = app => {
      // config axios object to new
    app.axios = new Axios(app);
};
