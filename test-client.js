import { io } from 'socket.io-client'
// import * as socketIo from 'socket.io';

const socket = io('http://localhost:5000', {
    auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzhkMTI4ZDI4ODczOGY1N2RjZDFjMyIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE3MzE3ODI3NjUsImV4cCI6MTczMTc4NjM2NX0.vLXuvKiPG8xzS4CsMXV-EW3DoLx_GDM-2qepaAbG1dI' 
    }
})

socket.on('initialData', (data) => console.log(data))

setInterval(() => {
  socket.emit('widget:add', {
    title: `${Date.now()}`,
    description: 'This is a test widget generated using WS',
    type: 'note',
    updatedBy: 'John Doe',
  })
}, 10000)

// // Listen for new widgets
// socket.on('widget:add', (widget) => {
//   // Update UI with new widget
// });

// // Listen for widget updates
// socket.on('widget:update', (updatedWidget) => {
//   // Update the UI with the updated widget
// });

// // Listen for widget deletions
// socket.on('widget:delete', (widgetId) => {
//   // Remove the widget from the UI
// });

// function sendEvents() {
//     socket.emit("widget:add",  {
//         "title": "Real-time Widget",
//         "description": "Created via WebSocket",
//         "type": "graph",
//         "updatedBy": "WebSocket User"
//     });
// }

// setInterval(sendEvents, 2000);
