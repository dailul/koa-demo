const mysql = require('mysql')

// 创建数据池
const pool  = mysql.createPool({
  host     : '127.0.0.1',   // 数据库地址
  user     : 'root',    // 数据库用户
  password : '15555895602',   // 数据库密码
  database : 'projectapplication'  // 选中数据库
})
module.exports = pool