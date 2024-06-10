const { io } = require("socket.io-client");

function startIo(){
  const socket = io(process.env.WEB_API);
  socket.on("connect", () => {
    console.log('connect',socket.id); // x8WIv7-mJelg7on_ALbx
  });

  socket.on("disconnect", () => {
    console.log('disconnect',socket.id); // undefined
  });
  return socket;
}
 

export default startIo