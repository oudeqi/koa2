// contorllers/user.js

import {updateFile} from '../service/file'

export default class User {

  static async avatar (ctx) {
    let filePath
    // 获取上传的文件
    const {file} = ctx.request.body.files || {}
    try {
      // 保存到指定路径
      filePath = updateFile('app/public/images/user/avatar', [file])[0]
      // 更新 user 表中的 avatar 字段
      await db.user.update({
        where: {
          avatar: filePath
        }
      })
    } catch (error) {
      return ctx.body = { success: false, error }
    }
    ctx.body = {
      success: true,
      filePath
    }
  }

  static async validator (ctx, next) {
    // 解析 token
    const {id, password} = jwt.verify(ctx.cookies.set('token'),  secret)
    // 向数据库匹配用户
    const result = await db.user.find({where: {
      id,
      password
    }})
    if (result) {
        // 存在，把当前用户的 id 通过 ctx.state 传递出去 
        ctx.state.id = id
        await next()
    } else {
      // 不存在，拦截掉后续的中间件并返回对应的数据
      return ctx.body = {
        success: false,
        error: '用户身份已过期'
      }
    }
  }

  static async info (ctx, next) {
    return ctx.body = {
      success: false
    }
  }
}
