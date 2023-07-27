import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users$ = new BehaviorSubject<any[]>([]);
  contactedUsers$ = new BehaviorSubject<any[]>([]);
  contacts$ = new BehaviorSubject<any[]>([]);
  constructor(
    private apiService: ApiService,
    private socketService: SocketService,
    private authService: AuthService
  ) {}
  getUsers(email: string): Observable<any[]> {
    return this.apiService.get(`/api/users?email=${email}`).pipe(
      tap((res) => {
        this.users$.next(res);
      })
    );
  }
  getContactedUsers(): Observable<any[]> {
    return this.apiService.get(`/api/users/contactedusers`).pipe(
      tap((res) => {
        this.contactedUsers$.next(res);
      })
    );
  }
  getContactes(user) {
    this.socketService.socket.emit('getContacts', {
      user: user,
    });
    this.socketService.socket.on('contacts', (contacts) => {
      console.log('contacts from client', contacts);
      this.contacts$.next(contacts);
    });
  }
  getUser(): Observable<any> {
    return this.apiService.get(`/api/users/current-user`).pipe(
      tap((user) => {
        this.authService.USER$.next(user);
      })
    );
  }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/users/${id}`);
  }
  getByRole(id: string): Observable<any[]> {
    return this.apiService.get(`/api/users/by-role/${id}`).pipe(
      tap((res) => {
        this.users$.next(res);
      })
    );
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/users/${id}`);
  }
  put(id: string, user: any): Observable<any> {
    return this.apiService
      .put(`/api/users/${id}`, user)
      .pipe(tap((updatedUser) => this.authService.USER$.next(updatedUser)));
  }
  patch(id: string): Observable<any> {
    return this.apiService.patch(`/api/users/${id}`);
  }
  search(email?: string): Observable<any[]> {
    return this.apiService.get(`/api/users?email=${email}`).pipe(
      tap((res) => {
        this.users$.next(res);
      })
    );
  }
}
