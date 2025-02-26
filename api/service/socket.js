const socketIo = require('socket.io');

let io;
let users = [];

const init = (server) => {
  io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
		
		io.to(socket.id).emit('receiveMessage', socket.id);

    // 监听客户端发送的消息
    socket.on('sendMessage', (data) => {
      const { userId,socketId } = data;
			
			let user = users.find(item => item.userId == userId);
			if(user){
				user.socketId = socketId;
			}else{
				users.push({
					userId,
					socketId
				});
			}
			console.log(users);
    });

    // 用户断开连接
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
};

// 向指定用户发送消息的函数
const sendMessageToUser = (userId, message) => {
  if (io) {
    io.to(userId).emit('receiveMessage', { message });
  }
};

const sendAllMessage = (userId, message) => {
  if (io) {
		for (let user of users) {
			io.to(user.socketId).emit('receiveMessage', { message });
			// if(userId!=user._id){
			// 	io.to(user.socketId).emit('receiveMessage', { message });
			// }
		}
  }
};

module.exports = {
  init,
  sendMessageToUser,
	sendAllMessage
};