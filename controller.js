const fs = require('fs')

function addMapping(router, mapping) {
  for (const url in mapping) {
    if (url.startsWith('GET ')) {
      const path = url.substring(4);
      router.get(path, mapping[url]);
    } else if (url.startsWith('POST ')) {
      const path = url.substring(5);
      router.post(path, mapping[url]);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}
function addControllers(router, controllers_dir) {
  const files = fs.readdirSync(__dirname + '/' + controllers_dir);
  const js_files = files.filter((f) => {
      return f.endsWith('.js');
  });

  for (const f of js_files) {
      console.log(`process controller: ${f}...`);
      const mapping = require(__dirname + '/' + controllers_dir + '/' + f);
      addMapping(router, mapping);
  }
}
module.exports = function (dir) {
  const controllers_dir = dir || 'routes', // 如果不传参数，扫描目录默认为'routes'
  router = require('koa-router')();
  addControllers(router, controllers_dir);
  return router.routes();
};