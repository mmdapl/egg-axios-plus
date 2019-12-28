'use strict';
/**
 * @description load plugin egg-axios-plus
 * @author Taylor
 * @github https://github.com/mmdapl
 */

module.exports = agent => {
  // Combined with egg framework last configuration, load egg-axios-plus
  if(agent.config.agent){
    require('./lib/axios_loader.js')(agent);
  }
};

