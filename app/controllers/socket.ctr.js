import ChatModel from '../models/chat.model'
export default function (io) {
  io.on('connection', (socket) => {
    console.log('socket connected --------------------')
    console.log(socket.client.request.headers)
  
    socket.on('send', async (data) => {
      console.log('send-------------------------')
      const {from, to, msg} = data
      const chat_id = [from, to].sort().join('_')
      const newChat = new ChatModel({chat_id, from, to, content: msg})
      const created = await newChat.save()
      if (created) {
        io.emit('receive', created)
      }
    })
    
  })
}