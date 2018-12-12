// contorllers/user.js

import {updateFile} from '../service/file'
import UserModel from '../models/user.model'
import UserService from '../service/user.service'
import ChatModel from '../models/chat.model'

const _filter = { pwd: 0, __v: 0 }

export default class User {

  // 用户消息列表
  static async msgList (ctx, next) {
    const user = ctx.session.user
    const users = {}
    const allUser = await UserModel.find({})
    allUser.forEach(item => {
      users[item._id] = {
        name: item.user,
        avatar: item.avatar
      }
    })
    const list = await ChatModel.find({
      $or: [
        { from: user._id },
        { to: user._id }
      ]
    })
    return ctx.body = {
      success: true,
      chat: list,
      users: users
    }
  }

  // 获取用户列表
  static async list (ctx, next) {
    const { type } = ctx.request.query
    const list = await UserModel.find({type})
    return ctx.body = {
      success: true,
      data: list
    }
  }

  // 获取用户信息
  static async info (ctx, next) {
    if (ctx.session.user) {
      return ctx.body = {
        success: true,
        data: ctx.session.user
      }
    } else {
      return ctx.body = {
        success: false,
        msg: '登录超时'
      }
    }
  }
  
  // 完善用户信息
  static async update (ctx, next) {
    const currentUser = ctx.session.user 
    if (currentUser) {
      const info = ctx.request.body
      const res = await UserModel.findByIdAndUpdate(currentUser._id, info)
      return ctx.body = {
        success: true,
        data: {
          ...info, 
          _id: res._id,
          user: res.user,
          type: res.type,
        }
      }
    } else {
      return ctx.body = {
        success: false,
        msg: '登录超时'
      }
    }
  }

  // 用户登录
  static async login (ctx, next) {
    const { user, pwd }= ctx.request.body
    const data = await UserModel.findOne(
      {user, pwd: UserService.encrypt(pwd)}, 
      {pwd: 0, __v: 0}
    )
    if (data) {
      ctx.session.user = data
      return ctx.body = {
        success: true,
        data: data
      }
    } else {
      return ctx.body = {
        success: false,
        msg: '用户名或密码错误'
      }
    }
  }

  // 用户注册
  static async register (ctx, next) {
    const { user, pwd, type }= ctx.request.body
    const data = await  UserModel.findOne({user}, _filter)
    if (data) {
      return ctx.body = {
        success: false,
        msg: '该用户名已经被注册'
      }
    } else {
      const encrypt = UserService.encrypt(pwd)
      const newUser = new UserModel({user, type, pwd:encrypt})
      const created = await newUser.save()
      console.log('created------\n', created)
      if (created) {
        ctx.session.user = created
        const {user, type, _id} = created
        return ctx.body = {
          success: true,
          data: {user, type, _id}
        }
      } else {
        return ctx.body = {
          success: false,
          msg: '未知错误'
        }
      }
    }
  }

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
}
