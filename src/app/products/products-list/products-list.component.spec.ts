import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import {ProductService} from '../shared/product.service';
import {FileService} from '../../files/shared/file.service';
import {Observable, of} from 'rxjs';
import {Product} from '../shared/product.model';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListComponent ],
      providers: [
        {provide: ProductService, useClass: ProductServiceStub},
        {provide: FileService, useClass: FileServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class ProductServiceStub {
  getProducts(): Observable<Product[]> {
    return of([]);
  }
}

class FileServiceStub {}
