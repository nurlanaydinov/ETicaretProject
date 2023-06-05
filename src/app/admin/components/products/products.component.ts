import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    // this.httpClientService.get<Product[]>({
    //   controller: "products"
    // }).subscribe(data => console.log(data));

    //  this.httpClientService.post(
    //   {controller: "products"},
    //  {
    //   name: "kibrit",
    //   stock: 29,
    //   price: 34
    //  }).subscribe();

    // this.httpClientService.put(
    //     {controller: "products"},
    //    {
    //     id: "2352c5cc-5599-43e6-8433-76aa091d9627",
    //     name: "kagiz",
    //     stock: 43,
    //     price: 35
    //    }).subscribe();

    // this.httpClientService.delete(
    //   { controller: "products" }, "5a85ea1b-9557-4e51-93fb-c28791ff40cc").subscribe();
  }
  @ViewChild(ListComponent) listComponents: ListComponent

  createdProduct(createdProduct: Create_Product) {
    this.listComponents.getProducts();
  }
}
