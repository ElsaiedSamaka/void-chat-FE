import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';
import { ChatService } from 'src/core/services/chat.service';
import { UsersService } from 'src/core/services/users.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-private-list',
  templateUrl: './private-list.component.html',
  styleUrls: ['./private-list.component.css'],
})
export class PrivateListComponent implements OnInit {
  users: any[] = [];
  selectedUsers: any[] = [];
  contacts: any[] = [];
  selectedContact: any;
  theme: string = '';
  showSearchInput: boolean = false;
  showModal: boolean = false;
  constructor(
    private userService: UsersService,
    private sharedService: SharedService,
    private chatService: ChatService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // TODO: we gonna call this below method on searching or getting all users
    this.getContactedUsers();
    this.getCurrentTheme();
  }
  selecteContact(contact: any) {
    this.selectedContact = contact;
    this.sharedService.selectedContact$.next(contact);
    this.chatService.getMessages(
      this.authService.USER$.value.id,
      this.sharedService.selectedContact$.value.id
    );
  }
  getContactedUsers() {
    this.userService.getContactedUsers().subscribe({
      next: (users) => {
        this.contacts = users;
        this.selectedContact = this.contacts[0]; // Initialize selectedContact with the first contact in the contacts array
        this.sharedService.selectedContact$.next(this.selectedContact); // Emit the initial value of selectedContact
      },
      error: (err) => {
        console.log('error while retreiveing contacts', err);
      },
      complete: () => {},
    });
  }
  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users.map((user) => ({
          ...user,
          isSelected: false,
        }));
        console.log('this.users', this.users);
      },
      error: (err) => {
        console.log('error while retrieving users', err);
      },
      complete: () => {},
    });
  }
  getCurrentTheme() {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }
  toggleSearchInput() {
    this.showSearchInput = !this.showSearchInput;
  }
  toggleModel() {
    this.showModal = !this.showModal;
    if (this.showModal) {
      this.getUsers();
    }
  }
  handleUserSelect(event) {
    const userId = event.target.value;
    const isChecked = event.target.checked;
    const user = this.users.find((u) => u.id == userId);
    console.log('user', user);
    if (isChecked) {
      this.selectedUsers.push(user);
    } else {
      const index = this.selectedUsers.findIndex((u) => u.id == userId);
      if (index !== -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
    console.log('selectedUsers', this.selectedUsers);
  }
}
