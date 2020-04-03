const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'bj-cynosdbmysql-grp-dm3e5bo8.sql.tencentcdb.com',
    root: 'root',
    password: 'A15555895602a@',
    database: 'koatest',
    timeout: 600000,
    connectTimeout: 60000
  })
const query = function( sql, values ) {

    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
  
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
  }
  module.exports = query