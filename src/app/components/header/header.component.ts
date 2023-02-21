import { Component, OnInit } from '@angular/core';
import { NgConfirmService } from 'ng-confirm-box';
import { AuthService } from 'src/app/service/auth.service';
import { CartApiServiceService } from 'src/app/service/cart-api-service.service';
import { CartCountService } from 'src/app/service/cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  title = 'Shopy'
  cartItemsCount = 0;

  constructor(private cartservice: CartCountService,
    private cartapiservice: CartApiServiceService,
    private auth: AuthService,
    private confirm: NgConfirmService) { }


  userIdfromToken!: number
  userdata!: string | null

  ngOnInit(): void {
    this.getcartCount();
    this.userIdfromToken = this.auth.getUserIdfromToken();
    this.subscribeCartCount();
    this.getnamefromToken()
  }

  subscribeCartCount() {
    this.cartapiservice.getcartProductsCount(this.userIdfromToken).subscribe(count => {
      this.cartItemsCount = count;
    })
  }

  getcartCount() {
    this.cartservice.getCartCount().subscribe(res => {
      this.cartItemsCount = res;
    })
  }

  // logout() {
  //   this.confirm.showConfirm("Do you want to logout?", () => {
  //     this.auth.signOut()
  //     this.auth.setLoggin(false);
  //   }, () => {

  //   })
  // }
  logout() {
    // this.confirm.showConfirm("Do you want to delete the cart item?", () => {
      alert("Do you want to logout?")
      this.auth.signOut()
      this.auth.setLoggin(false);
    // }, () => {

    // })
  }

  getnamefromToken() {
    this.userdata = localStorage.getItem('user')
  }
}
