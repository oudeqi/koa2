export default async function(ctx, next) {
  try {
    await next();
  } catch (err) {
    const status = ctx.status = err.status || 500
  
    // 自定一些常见的错误逻辑
    if (status === 404) { /** **/}
    if (status === 500) { /** **/}

    // 同时，触发 app 的 error 事件
    // 它会捕获应用级别的错误消息
    ctx.app.emit('error', err, ctx)
  }
}

// 抛出一个 403 错误
// ctx.throw(403, '用户身份已过期')

// 直接抛出， 默认为 500 错误
// throw new Error('发生了一个致命错误'); 