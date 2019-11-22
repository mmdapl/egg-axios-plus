'use strict';
/**
 * @description load plugin egg-axios-plus
 * @author Taylor
 * @github https://github.com/mmdapl
 */
module.exports = app => {
  // Combined with egg framework last configuration, load egg-axios-plus
  require('./lib/axios_loader.js')(app);

};

