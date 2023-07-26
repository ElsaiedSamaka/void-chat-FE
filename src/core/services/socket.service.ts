import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { getCookie } from '../helper/getCookie';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;

  constructor(private authService: AuthService) {
    const token = getCookie('token');
    this.socket = io(environment.api_url, {
      query: { token, userId: this.authService.USER$.value.id },
    });
  }
}
