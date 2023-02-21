import { Component, OnInit } from '@angular/core';
import { ProductsModel } from 'src/app/model/products-model';
import { CartCountService } from 'src/app/service/cart-service.service';
import { products } from 'src/app/model/products';
import { CartApiServiceService } from 'src/app/service/cart-api-service.service';
import { CartModel } from 'src/app/model/cart';
import { AuthService } from 'src/app/service/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private cartservice: CartCountService,
    private cartapiservice: CartApiServiceService,
    private auth: AuthService,
    private toast: NgToastService) { }


  public productsList: ProductsModel[] = []
  cartList: CartModel[] = []
  userIdfromToken!: number

  ngOnInit(): void {
    this.auth.getuserfromToken();
    this.userIdfromToken = this.auth.getUserIdfromToken()
    this.getAllProductsInHomePage();
 }

  insertIntoCart(product: ProductsModel) {
    this.cartapiservice.addCartProducts({
      userId: this.userIdfromToken,
      productId: product.productId
    }).subscribe(resp => {
      this.getCartCount();
    })
    this.toast.success({ detail: "SUCCESS", summary: "Product is added to your cart", duration: 1000 });
  }

  getCartCount() {
      this.cartapiservice.getcartProductsCount(this.userIdfromToken).subscribe(data => {
      this.cartservice.setCount(data)
    })
  }

  getAllProductsInHomePage() {
    this.cartapiservice.getAllProducts().subscribe((result: ProductsModel[]) =>
      (this.productsList = result))
  }
}
