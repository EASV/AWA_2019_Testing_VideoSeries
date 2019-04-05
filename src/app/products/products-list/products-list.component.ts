import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product.model';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Observable<Product[]>;
  constructor(private ps: ProductService) {
  }

  ngOnInit() {
    this.products = this.ps.getProducts();
  }

  deleteProduct(product: Product) {
    const obs = this.ps.deleteProduct(product.id);
    obs.subscribe(productFromFirebase => {
        window.alert('product with id: ' +
          productFromFirebase.id + ' is Deleted');
      }, error1 => {
      window.alert('product not found id: ' + product.id);
    });
  }
}
