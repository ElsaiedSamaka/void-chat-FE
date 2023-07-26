import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { SharedService } from 'src/app/pages/index/services/shared.service';
import { environment } from 'src/environments/environment.prod';
import { getCookie } from '../helper/getCookie';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  socket: Socket;
  currentUser;
  selectedContact;
  messages$ = new BehaviorSubject<any[]>([]);

  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    const token = getCookie('token');
    this.socket = io(environment.api_url, {
      query: { token, userId: this.authService.USER$.value.id },
    });
    this.sharedService.selectedContact$.subscribe((selectedContact) => {
      this.selectedContact = selectedContact;
    });
  }
  getMessages(senderId: number, recipientId: number) {
    try {
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
      console.log('newMessage', newMessage);
      this.messages$
        .pipe(
          filter((messages) => !messages.includes(newMessage)),
          tap((messages) => messages.push(newMessage))
        )
        .subscribe();
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

  getContactedUsers(userId) {
    console.log('called');
    this.socket.emit('getContacts', {
      userId: userId,
    });
    this.socket.on('contacts', (contacts) => {
      console.log('contacts', contacts);
    });
  }
}
