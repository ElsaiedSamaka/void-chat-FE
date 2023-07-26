import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { SharedService } from 'src/app/pages/index/services/shared.service';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  selectedContact;
  messages$ = new BehaviorSubject<any[]>([]);

  constructor(
    private socketService: SocketService,
    private sharedService: SharedService
  ) {
    this.sharedService.selectedContact$.subscribe((selectedContact) => {
      this.selectedContact = selectedContact;
    });
  }
  getMessages(senderId: number, recipientId: number) {
    try {
      this.socketService.socket.emit('getMessages', {
        sender: senderId,
        recipient: recipientId,
      });

      this.socketService.socket.on('messages', (messages) => {
        this.messages$.next(messages);
      });
    } catch (error) {
      console.log('err', error);
    }
  }

  sendMessage(senderId: number, recipientIds: number[], text: string) {
    this.socketService.socket.emit('sendMessage', {
      sender: senderId,
      recipients: recipientIds,
      message: text,
    });
    this.socketService.socket.on('newMessage', (newMessage) => {
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
    this.socketService.socket.emit('join', {
      userId: userId,
      recipientId: recipientId,
    });
  }

  leaveRoom(userId, recipientId) {
    this.socketService.socket.emit('leave', {
      userId: userId,
      recipientId: recipientId,
    });
  }
}
