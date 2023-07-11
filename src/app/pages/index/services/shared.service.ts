import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  selectedGroup$ = new BehaviorSubject<any>(null);
  selectedContact$ = new BehaviorSubject<any>(null);
  constructor() {}
}
