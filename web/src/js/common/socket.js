// src/utils/socket.js
import { io } from 'socket.io-client';

let socket;

// 创建 Socket 实例并连接到服务器
socket = io('http://localhost:3000'); // 替换为你的服务器地址

// 监听连接成功事件
socket.on('connect', () => {
  console.log('Connected to server with socket ID:', socket.id);
});

// 监听断开连接事件
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// 导出 Socket 实例
export default socket;
