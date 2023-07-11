import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoginsService {
  user_logins$ = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}
  getUsersLogins(): Observable<any[]> {
    return this.apiService.get(`/api/user-logins`).pipe(
      tap((res) => {
        this.user_logins$.next(res);
      })
    );
  }
}
