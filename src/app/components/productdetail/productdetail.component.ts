import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from 'src/app/model/products';
import { ProductsModel } from 'src/app/model/products-model';
import { CartApiServiceService } from 'src/app/service/cart-api-service.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})

export class ProductdetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private cartapiservice: CartApiServiceService,
  ) { }

  productID: number | string | undefined | null
  product?: ProductsModel;

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.productID = param.get('id')
      let items = products
      this.product = items.find(p => p.productId === this.productID);
      this.cartapiservice.getEachProductDetail(Number(this.productID))
        .subscribe((result: ProductsModel) => (this.product = result))
    });
  }
}
