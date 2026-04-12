// Socket.io for Real-time Messaging
// FREE TIER: Self-hosted with no limits

import io, { Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const socketService = {
  // Connect to Socket.io server
  connect: (serverUrl: string = process.env.NEXT_PUBLIC_API_URL): Socket => {
    if (socket) return socket;

    socket = io(serverUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    return socket;
  },

  // Disconnect socket
  disconnect: (): void => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  // Send message
  sendMessage: (
    recipientId: string,
    message: string,
    appointmentId?: string
  ): void => {
    if (!socket) throw new Error('Socket not connected');
    socket.emit('send_message', { recipientId, message, appointmentId });
  },

  // Listen for messages
  onMessageReceived: (callback: (data: any) => void): void => {
    if (!socket) throw new Error('Socket not connected');
    socket.on('receive_message', callback);
  },

  // Join conversation room
  joinRoom: (roomId: string): void => {
    if (!socket) throw new Error('Socket not connected');
    socket.emit('join_room', roomId);
  },

  // Leave conversation room
  leaveRoom: (roomId: string): void => {
    if (!socket) throw new Error('Socket not connected');
    socket.emit('leave_room', roomId);
  },

  // Mark message as read
  markAsRead: (messageId: string): void => {
    if (!socket) throw new Error('Socket not connected');
    socket.emit('mark_as_read', messageId);
  },

  // Get online status
  onUserStatusChanged: (callback: (data: any) => void): void => {
    if (!socket) throw new Error('Socket not connected');
    socket.on('user_status_changed', callback);
  },

  // Get socket instance
  getSocket: (): Socket | null => socket,
};
