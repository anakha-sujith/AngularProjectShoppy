import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { NgConfirmService } from 'ng-confirm-box';
import { CartDetails } from 'src/app/model/cart';
import { AuthService } from 'src/app/service/auth.service';
import { CartApiServiceService } from 'src/app/service/cart-api-service.service';
import { CartCountService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  constructor(private cartService: CartCountService,
    private route: Router,
    private cartApiService: CartApiServiceService,
    private auth: AuthService,
    private toast: NgToastService,
    private confirm: NgConfirmService) { }

  userIdFromToken!: number
  public cartItems: CartDetails[] = []


  total = 0
  shipping = 50
  subtotal = 0
  ngOnInit(): void {
    this.userIdFromToken = this.auth.getUserIdfromToken();
    let cartData = this.getCartProductById();
    console.log(cartData, 78)
  }

  deleteFromCart(cartId: any) {
    this.confirm.showConfirm("Do you want to delete the cart item?", () => {
      this.cartApiService.deleteCartProducts(cartId).subscribe(res => {
        this.cartItems = this.cartItems.filter((data: any) => data.cartId !== cartId)
        this.cartService.setCount(this.cartItems.length)
        console.log(this.total, this.cartItems, "this.cartItems")
        this.cartamount(this.cartItems);
      })
      this.toast.success({ detail: "SUCCESS", summary: "Your cart item is deleted", duration: 1000 });
    },
      () => {
      })
  }

  backToProducts() {
    this.route.navigate(['products'])
  }

  getCartProductById() {
    this.cartApiService.getCartById(this.userIdFromToken).subscribe(response => {
      this.cartItems = response
      this.cartamount(response);

    })
  }
  cartamount(res: any) {
    let sum = 0;
    res.map((e: any) => {
      sum += e.price
    })
    this.total = sum
    this.subtotal = this.total + this.shipping
  }

}