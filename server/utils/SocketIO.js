const { Server } = require('socket.io');

let io = null;

const init = () => {
  io.on('connection', socket => {
    console.log(`User connected ${socket.id}`);
    
    socket.on('join_chat', (data) => {
      const { chat } = data;
      
      socket.join(chat);
    });
    
    socket.on('leave_chat', (data) => {
      const { chat } = data;
      
      socket.leave(chat);
    })
    
    socket.on('send_message', (data) => {
      const { chat } = data;
      
      io.in(chat).emit('receive_message');
    });
  });
}

exports.setupIO = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN || 'http://localhost:3000',
      methods: ['GET', 'POST']
    }
  });
  
  init();
}

exports.io = io;