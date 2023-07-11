import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items$ = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}
  getAll(): Observable<any[]> {
    return this.apiService.get('/api/cart').pipe(
      tap((cartItems) => {
        this.items$.next(cartItems);
      })
    );
  }
  getUserCarts(): Observable<any[]> {
    return this.apiService.get('/api/cart/user-carts').pipe(
      tap((cartItems) => {
        this.items$.next(cartItems);
      })
    );
  }
  getById(id: string): Observable<any> {
    return this.apiService.get(`/api/cart/${id}`);
  }
  deleteById(id: string): Observable<any> {
    return this.apiService.delete(`/api/cart/${id}`).pipe(
      tap((deleteCartItem) => {
        let updatedCartItems = this.items$.value.filter(
          (cartItem) => cartItem.id !== deleteCartItem.id
        );
        this.items$.next(updatedCartItems);
      })
    );
  }
  post(cartItem: any): Observable<any> {
    return this.apiService.post('/api/cart', cartItem).pipe(
      tap((addedCartItem) => {
        this.items$.value.push(addedCartItem);
      })
    );
  }
  put(id: string, cartItem: any): Observable<any> {
    return this.apiService.put(`/api/cart/${id}`, cartItem).pipe(
      tap((updatedCartItem) => {
        const index = this.items$.value.indexOf(id);
        this.items$.value.splice(index, 1, updatedCartItem);
      })
    );
  }
}
