<<<<<<< HEAD

import io from 'socket.io-client';
const  socket = io('http://localhost:8000');


=======
import openSocket from 'socket.io-client';
const  socket = openSocket('http://api.rainmetery.xyz');
>>>>>>> c4ef6e1dfc4a13e6112b3c0abf66aa6f07625e61
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}
export { subscribeToTimer };
