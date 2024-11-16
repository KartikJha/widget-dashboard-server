import { checkWSAuth } from '../services/authService.js';

import Widget from '../models/Widget.js';

export default function(wsServer) {
  // Handling WebSocket connections
  wsServer.on('connection', async (socket) => {
    console.log('New client connection request');
    let user;
    try {
      user = await checkWSAuth(socket)
    } catch (err) {
      console.log(`Error while auth validation ${err}, disconnecting from client`);
      return false
    }
    
    // Emit initial widgets data to the client
    Widget.find().then(widgets => {
      wsServer.emit('initialData', widgets);
      
    });

    // Listen for widget updates
    socket.on('widget:add', (widget) => {
      console.log(`Received widget addition request ${JSON.stringify(widget)}`);
      const newWidget = new Widget(widget);
      newWidget.save().then(savedWidget => {
        wsServer.emit('widget:add', savedWidget);  // Broadcast to all connected clients
      });
    });

    socket.on('widget:update', (widgetId, updatedData) => {
      Widget.findByIdAndUpdate(widgetId, updatedData, { new: true }).then(updatedWidget => {
        wsServer.emit('widget:update', updatedWidget);  // Broadcast the update
      });
    });

    socket.on('widget:delete', (widgetId) => {
      Widget.findByIdAndDelete(widgetId).then(() => {
        wsServer.emit('widget:delete', widgetId);  // Broadcast the delete event
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}
