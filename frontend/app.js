module.exports = (function () {
  'use strict';

  var koa = require('koa');
  var serve = require('koa-static');
  var proxy = require('koa-proxy');
  var logger = require('koa-logger');
  var app = new koa();

  app.use(logger());

  app.use(proxy({
      host: 'http://localhost:3000/',
      match: /^\/api\//
  }));

  app.use(serve('./app'));

  app.listen(8000);

})();