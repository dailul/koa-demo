const parsePostData = require('../utils/postData')
const query = require('../utils/sql')


const middleToken = async (ctx, next) => {
  console.log('data===>1111111')
  await next()
}
const fn_hello = async (ctx, next) => {
  // const name = ctx.params.id
  // ctx.cookies.set(
  //   'cid', 
  //   'hello world',
  //   {
  //     domain: 'localhost',  // 写cookie所在的域名
  //     path: '/index',       // 写cookie所在的路径
  //     maxAge: 10 * 60 * 1000, // cookie有效时长
  //     expires: new Date('2017-02-15'),  // cookie失效时间
  //     httpOnly: false,  // 是否只用于http请求中获取
  //     overwrite: false  // 是否允许重写
  //   }
  // )
  // console.log('query:', ctx.query)
  // console.log('queryString:', ctx.querystring)
  // console.log('request.query', ctx.request.query)
  // console.log('request.querystring', ctx.request.querystring)
  // ctx.response.body = name
  // ctx.response.body = {
  //   content: [{
  //     name: 'iPhone',
  //     price: 6999
  //   }, {
  //     name: 'Kindle',
  //     price: 999
  //   }]
  // }
// 创建数据池
const pool  = mysql.createPool({
  host     : '127.0.0.1',   // 数据库地址
  // port     : 3306,
  user     : 'root',    // 数据库用户
  password : '15555895602',   // 数据库密码
  database : 'projectapplication'  // 选中数据库
})
// connection.query('SELECT * FROM wx_access_log',  (error, results, fields) => {
//   if (error) throw error
//   // connected! 
//   console.log('result', results)
//   console.log('file', fields)
//   ctx.response.body = results
//   // 结束会话
//   // connection.release() 
// });
  // 在数据池中进行会话操作
  // console.log('pool', pool)
pool.getConnection(function(err, connection) {

  connection.query('SELECT * FROM wx_access_log',  (error, results, fields) => {
    console.log('result', results)
    console.log('file', fields)
    ctx.response.body = results
    // 结束会话
    connection.release();

    // 如果有错误就抛出
    if (error) throw error;
  })
})
}
const newsData = async (ctx, next) => {
  console.log('ctx====>', ctx.request.body)
  // const data = await parsePostData(ctx)
  // console.log('data====>', data)
  ctx.response.body = ctx.request.body
}
const querySql = async(ctx, next) => {
  let sql = 'SELECT * FROM user'
  let dataList = await query( sql )
   console.log('dataList', dataList)
   ctx.response.body = dataList
}
module.exports = {
  'GET middle' : middleToken,
  'GET /hello/:id': fn_hello,
  'POST /news': newsData,
  'GET /querySql': querySql
}
