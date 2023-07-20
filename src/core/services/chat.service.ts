import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';
import { SharedService } from 'src/app/pages/index/services/shared.service';
import { environment } from 'src/environments/environment.prod';
import { getCookie } from '../helper/getCookie';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: any;
  currentUser;
  selectedContact;
  messages$ = new BehaviorSubject<any[]>([]);

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private sharedService: SharedService
  ) {
    const token = getCookie('token');
    this.socket = io(environment.api_url, {
      query: { token, userId: this.authService.USER$.value.id },
    });
    this.sharedService.selectedContact$.subscribe((selectedContact) => {
      this.selectedContact = selectedContact;
      console.log(this.selectedContact);
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
    this.socket.emit('sendMessage', {
      sender: senderId,
      recipients: recipientIds,
      message: text,
    });
    this.socket.on('newMessage', (newMessage) => {
      if (!this.messages$.value.includes(newMessage)) {
        this.messages$.value.push(newMessage);
      }
    });
  }

  joinRoom(userId, recipientId) {
    this.socket.emit('join', {
      userId: userId,
      recipientId: recipientId,
    });
  }
  
  leaveRoom(userId, recipientId) {
    this.socket.emit('leave', {
      userId: userId,
      recipientId: recipientId,
    });
  }
}
