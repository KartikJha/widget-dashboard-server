import socketService from '../services/socketService.js'


export default function initSocketServer(io) {
  socketService(io)
}
