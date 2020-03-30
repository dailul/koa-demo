const fs = require('fs')
function addMapping(app, mapping) {
    console.log(app)
  for (var url in mapping) {
    if (url.startsWith('GET ')) {
      var path = url.substring(4);
      console.log('path', path, mapping[url])
      app.get(mapping[url]);
      console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      var path = url.substring(5);
      app.post(mapping[url]);
      console.log(`register URL mapping: POST ${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  }
}
function addMiddleWare(app, controllers_dir) {
  var files = fs.readdirSync(__dirname + '/' + controllers_dir);
  var js_files = files.filter((f) => {
      return f.endsWith('.js');
  });

  for (var f of js_files) {
      console.log(`process controller: ${f}...`);
      let mapping = require(__dirname + '/' + controllers_dir + '/' + f);
      addMapping(app, mapping);
  }
}
module.exports = function(app) {
    return addMiddleWare(app, 'routes')
}