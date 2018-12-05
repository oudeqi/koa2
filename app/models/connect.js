import mongoose from 'mongoose'

class Connect {
  constructor (config) {
    this.maxConnectTimes = 0
    this.init(config)
  }

  init (config) {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(config)
    mongoose.connection.on('disconnect', () => {
      this.maxConnectTimes++
      if (this.maxConnectTimes < 5) {
        mongoose.connect(config)
      } else {
        throw new Error('数据库挂了吧少年')
      }
    })
    mongoose.connection.on('error', err => {
      this.maxConnectTimes++
      console.log(err)
      if (this.maxConnectTimes < 5) {
        mongoose.connect(config)
      } else {
        throw new Error('数据库挂了吧少年')
      }
    })
    mongoose.connection.on('open', () => {
      console.log('Mongodb connected!')
    })
  }
}

let connect
const connectDB = function (config) {
  if (connect) {
    return connect
  } else { 
    return connect = new Connect(config)
  }
}
export default connectDB