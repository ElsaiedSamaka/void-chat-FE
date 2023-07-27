import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment.prod';
import { getCookie } from '../helper/getCookie';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;

  constructor() {
    const token = getCookie('token');
    console.log('token', token);
    this.socket = io(environment.api_url, {
      query: { token },
      autoConnect: false,
    });
    this.testConnection();
  }
  testConnection() {
    this.socket.on('testrespond', (mssg) => {
      console.log('mssg', mssg);
    });
    setInterval(() => {
      this.socket.emit('testevent', 'hello from client');
    }, 5000);
  }
}
