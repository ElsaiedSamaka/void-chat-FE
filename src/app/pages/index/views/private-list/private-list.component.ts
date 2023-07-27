import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  of,
  pairwise,
  switchMap,
} from 'rxjs';
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
  filteredContacts: any[] = [];
  selectedContact: any;
  theme: string = '';
  showSearchInput: boolean = false;
  searchString: string = '';
  showModal: boolean = false;
  showDropdown: boolean = false;
  email: string = '';
  currentUser;
  previousValue: any;
  currentValue: any;
  myForm;
  constructor(
    private userService: UsersService,
    private sharedService: SharedService,
    private chatService: ChatService,
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.getCurrentTheme();
    this.handleDropDown();
    this.getCurrentUser();
    this.getContacts();
    this.myForm = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.myForm.invalid) return;
    //send message
    this.chatService.sendMessage(
      this.currentUser.id,
      this.selectedUsers.map((user) => user.id),
      this.myForm.controls.message.value
    );
    this.myForm.reset();
    this.selectedUsers.length = 0;
    this.toggleModel();
    setTimeout(() => {
      this.getContacts();
    }, 500);
  }
  getCurrentUser() {
    this.authService.USER$.subscribe((res) => {
      this.currentUser = res;
    });
  }
  selectContact(contact: any) {
    this.selectedContact = contact;
    this.sharedService.selectedContact$.next(contact);
    this.sharedService.selectedContact$
      .pipe(pairwise())
      .subscribe(([previousValue, currentValue]) => {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
      });

    if (this.currentValue.id != this.previousValue.id) {
      this.leaveRoom();
      this.joinRoom();
    } else {
      this.joinRoom();
    }
    this.getMessages();
  }
  getContacts() {
    try {
      this.userService.getContactes(this.authService.USER$.value.id);
      this.userService.contacts$.subscribe({
        next: (contacts) => {
          this.contacts = contacts;
          this.filteredContacts = this.contacts;
        },
        error: (err) => {
          console.log('error', err);
        },
        complete: () => {
          this.selectedContact = this.contacts[0];
          this.sharedService.selectedContact$.next(this.selectedContact);
          this.joinRoom();
        },
      });
    } catch (err) {
      console.log('error while retrieving contacts', err);
    }
  }
  getMessages() {
    if (this.sharedService.selectedContact$.value.id)
      this.chatService.getMessages(
        this.authService.USER$.value.id,
        this.sharedService.selectedContact$.value?.id
      );
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
  joinRoom() {
    const selectedContact = this.selectedContact;
    console.log(
      `room:${this.authService.USER$.value.id}-${selectedContact.id}`
    );
    if (selectedContact) {
      this.chatService.joinRoom(
        this.authService.USER$.value.id,
        selectedContact.id
      );
    }
  }
  leaveRoom() {
    console.log(
      `room:${this.authService.USER$.value.id}-${this.previousValue.id}`
    );
    if (this.previousValue.id) {
      this.chatService.leaveRoom(
        this.authService.USER$.value.id,
        this.previousValue.id
      );
    }
  }
  handleSearchOverContactedUser(target) {
    console.log('searchString', target.value);
    const searchString = target.value.toLowerCase().trim();

    // create a regular expression from the search string
    const regex = new RegExp(searchString, 'i');

    // filter contacts based on search string
    this.filteredContacts = this.contacts.filter(
      (contact) => regex.test(contact.name) || regex.test(contact.email)
    );
    console.log('filteredContacts', this.filteredContacts);
  }
}
