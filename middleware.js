const fs = require('fs')
function addMiddleWare(app, controllers_dir) {
  var files = fs.readdirSync(__dirname + '/' + controllers_dir);
  var js_files = files.filter((f) => {
      return f.endsWith('.js');
  });
  for (var f of js_files) {
      console.log(`process controller: ${f}...`);
      let mapping = require(__dirname + '/' + controllers_dir + '/' + f);
      for (let url in mapping) {
        if (url && url.indexOf('middle') >= 0) {
          app.use(mapping[url])
        }
      }
  }
}
module.exports = function(app) {
    return addMiddleWare(app, 'routes')
}