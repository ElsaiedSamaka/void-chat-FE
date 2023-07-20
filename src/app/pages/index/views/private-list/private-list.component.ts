import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
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
  showDropdown: boolean = false;
  email: string = '';
  currentUser;

  constructor(
    private userService: UsersService,
    private sharedService: SharedService,
    private chatService: ChatService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getContactedUsers();
    this.getCurrentTheme();
    this.handleDropDown();
    this.getCurrentUser();
  }
  myForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });
  onSubmit() {
    if (this.myForm.invalid) return;
    //send message
    console.log('selectedContact', this.selectedUsers);
    this.chatService.sendMessage(
      this.currentUser.id,
      [this.selectedUsers[0].id],
      this.myForm.controls.message.value
    );
  }
  getCurrentUser() {
    this.authService.USER$.subscribe((res) => {
      this.currentUser = res;
    });
  }
  selecteContact(contact: any) {
    this.selectedContact = contact;
    this.sharedService.selectedContact$.next(contact);
     this.chatService.joinRoom(
       this.authService.USER$.value.id,
       this.sharedService.selectedContact$.value.id
     );
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
        this.chatService.joinRoom(
          this.authService.USER$.value.id,
          this.sharedService.selectedContact$.value.id
        );
      },
      error: (err) => {
        console.log('error while retreiveing contacts', err);
      },
      complete: () => {},
    });
  }
  getUsers() {
    this.userService
      .getUsers(this.email)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((users) => {
          if (users.length > 10) {
            users = users.slice(0, 10);
          }
          return of(users);
        })
      )
      .subscribe({
        next: (users) => {
          this.users = users.map((user) => ({
            ...user,
            isSelected: false,
          }));
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
    const selectedIndex = this.selectedUsers.findIndex((u) => u.id == userId);

    if (isChecked) {
      if (selectedIndex === -1) {
        this.selectedUsers.push(user);
      }
      this.showDropdown = false;
      this.email = '';
    } else {
      if (selectedIndex !== -1) {
        this.selectedUsers.splice(selectedIndex, 1);
      }
      this.email = '';
      this.showDropdown = false;
    }
  }
  handleDropDown() {
    document.addEventListener('click', (event) => {
      const dropdown = document.getElementById('dropdownSearch');
      const searchInput = document.getElementById('users') as HTMLInputElement;
      if (dropdown) {
        if (searchInput.value === '') {
          this.showDropdown = false;
        } else if (
          !dropdown.contains(event.target as Node) &&
          !searchInput.contains(event.target as Node)
        ) {
          this.showDropdown = false;
        }
      }
    });
  }
  removeSelectedUser(i: number) {
    this.selectedUsers.splice(i, 1);
  }
  handleEmailChange() {
    this.getUsers();
  }
}
