'use strict';
module.exports = {
  // get axios method to use by context
  get axios() {
    return this.app.axios;
  },
};
