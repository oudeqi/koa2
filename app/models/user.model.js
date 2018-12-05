const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  user: {type: String, require: true},
  pwd: {type: String, require: true},
  type: {type: String, require: true},
  avatar: {type: String}, // 头像
  desc: {type: String}, // 简介
  title: {type: String}, // 职位
  company: {type: String}, // boss字段
  money: {type: String}, // boss字段
})

// static md5 (pwd) {

// }
const User = mongoose.model('User', UserSchema)
console.log('User model')

export default User