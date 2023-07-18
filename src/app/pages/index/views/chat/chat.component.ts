import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { ChatService } from 'src/core/services/chat.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  currentUser;
  selectedGroup: any;
  selectedContact: any;
  messages: any[] = [];
  newMessage = '';
  theme: string = '';
  constructor(
    private chatService: ChatService,
    private sharedService: SharedService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.getCurrentTheme();
  }

  @ViewChild('chatContainer', { static: false }) chatContainer: ElementRef;

  ngOnInit() {
    this.sharedService.selectedGroup$.subscribe((selectedGroup) => {
      this.selectedGroup = selectedGroup;
      // Do something with the selected group
    });
    this.sharedService.selectedContact$.subscribe((selectedContact) => {
      this.selectedContact = selectedContact;
      this.getMessages();
    });
    // get current user
    this.getCurrentUser();
  }

  ngAfterViewChecked() {
    // Scroll to the bottom of the chat container
    this.scrollBottom();
  }

  sendMessage() {
    try {
      if (this.newMessage != '')
        this.chatService.sendMessage(
          this.currentUser.id,
          [this.selectedContact.id],
          this.newMessage
        );
      this.newMessage = '';
    } catch (error) {
      console.log('error while sending message', error);
    }
  }

  getMessages() {
    this.chatService.getMessages(this.currentUser.id, this.selectedContact?.id);
    // subscribe to messages$
    this.chatService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  getCurrentUser() {
    this.authService.USER$.subscribe((res) => {
      this.currentUser = res;
    });
  }

  scrollBottom() {
    // Scroll to the bottom of the chat container
    if (this.chatContainer) {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    }
  }
  getCurrentTheme() {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }
}
