'use strict';

const mock = require('egg-mock');

describe('test/axios-plus.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/axios-plus-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, axios')
      .expect(200);
  });
});
