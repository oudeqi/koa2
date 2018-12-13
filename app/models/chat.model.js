const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
  chat_id: {type: String, require: true},
  from: {type: String, require: true},
  to: {type: String, require: true},
  read: {type: Boolean, default:false},
  content: {type: String, require:true},
  create_time: {
    type: Number, 
    default: Date.now // () => new Date().getTime()
  }
})

const Chat = mongoose.model('Chat', ChatSchema)
export default Chat