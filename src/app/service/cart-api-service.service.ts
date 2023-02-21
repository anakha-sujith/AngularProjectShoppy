import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductsModel } from '../model/products-model';
import { CartDetails, CartModel } from '../model/cart';
import { CartCountService } from './cart-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartApiServiceService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient, private cartservice: CartCountService) { }

  getAllProducts(): Observable<ProductsModel[]> {
    return this.http.get<ProductsModel[]>(this.baseApiUrl + '/api/ShoppingCart/GetAllProducts')
  }

  getEachProductDetail(productID: number): Observable<ProductsModel> {
    return this.http.get<ProductsModel>(this.baseApiUrl + '/api/ShoppingCart/GetAnyProduct/' + productID)
  }

  addCartProducts(product: CartModel): Observable<CartModel[]> {
    return this.http.post<CartModel[]>(this.baseApiUrl + '/api/ShoppingCart/AddCart', product)
  }

  getCartById(userId: number): Observable<CartDetails[]> {
    return this.http.get<CartDetails[]>(this.baseApiUrl + '/api/ShoppingCart/CartProductById/' + userId)
  }

  deleteCartProducts(cartId: number): Observable<ProductsModel> {
    return this.http.delete<ProductsModel>(this.baseApiUrl + '/api/ShoppingCart/getCart/' + cartId)
  }
  getcartProductsCount(userId: number): Observable<number> {
    return this.http.get<number>(this.baseApiUrl + '/api/ShoppingCart/count/' + userId)
  }
} 
