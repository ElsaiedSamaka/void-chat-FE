import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment.prod';
import { getCookie } from '../helper/getCookie';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: any;
  user;
  messages$ = new BehaviorSubject<any[]>([]);

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
    const token = getCookie('token');
    this.socket = io(environment.api_url, {
      query: { token, userId: this.authService.USER$.value.id },
    });
  }
  getMessages(senderId: number, recipientId: number) {
    try {
      console.log('senderId', senderId, 'recipientId', recipientId);
      this.socket.emit('getMessages', {
        sender: senderId,
        recipient: recipientId,
      });

      this.socket.on('messages', (messages) => {
        this.messages$.next(messages);
      });
    } catch (error) {
      console.log('err', error);
    }
  }

  sendMessage(senderId: number, recipientIds: number[], text: string) {
    console.log('senderId', senderId, 'recipientIds', recipientIds);
    this.socket.emit('sendMessage', {
      sender: senderId,
      recipients: recipientIds,
      message: text,
    });
    this.socket.on('newMessage', (message) => {
      if (!this.messages$.value.includes(message)) {
        this.getMessages(senderId, message.recipientId);
      }
    });
  }
}
