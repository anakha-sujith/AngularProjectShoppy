import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartCountService {

  cartCount = new BehaviorSubject<number>(0)

  constructor() { }

  getCartCount() {
    return this.cartCount.asObservable()
  }
  
  setCount(count: number) {
    this.cartCount.next(count)
  }
}



