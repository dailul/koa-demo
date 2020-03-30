const middleToken = async (ctx, next) => {
  console.log('data===>')
  await next()
}
const fn_hello = async (ctx, next) => {
  const name = ctx.params.id
  console.log('name', name)
  ctx.response.body = name
  // ctx.response.body = {
  //   content: [{
  //     name: 'iPhone',
  //     price: 6999
  //   }, {
  //     name: 'Kindle',
  //     price: 999
  //   }]
  // }
}
module.exports = {
  'GET middle' : middleToken,
  'GET /hello/:id': fn_hello
}
