import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/core/services/auth.service';
import { ChatService } from 'src/core/services/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: any;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.authService.USER$.subscribe((res) => {
      this.currentUser = res;
    });
  }
}
