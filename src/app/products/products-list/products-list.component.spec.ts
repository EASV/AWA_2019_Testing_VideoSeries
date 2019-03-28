import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import {ProductService} from '../shared/product.service';
import {FileService} from '../../files/shared/file.service';
import {Observable, of} from 'rxjs';
import {Product} from '../shared/product.model';
import {RouterTestingModule} from '@angular/router/testing';
import {Location} from '@angular/common';
import {DOMHelper} from '../../../testing/dom-helper';
import {Router} from '@angular/router';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let helper: Helper;
  let dh: DOMHelper<ProductsListComponent>;
  let productServiceMock: any;
  let fileServiceMock: any;
  beforeEach(async(() => {
    productServiceMock = jasmine.createSpyObj('ProductService', ['getProducts']);
    productServiceMock.getProducts.and.returnValue(of([]));
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl']);
    fileServiceMock.getFileUrl.and.returnValue('');
    TestBed.configureTestingModule({
      declarations: [
        ProductsListComponent
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: ProductService, useValue: productServiceMock},
        {provide: FileService, useValue: fileServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    helper = new Helper();
    dh = new DOMHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain an h2 tag', () => {
    expect(dh.singleText('h2')).toBe('List all Products');
  });

  it('Should minimum be one button on the page', () => {
    expect(dh.count('button')).toBeGreaterThanOrEqual(1);
  });

  it('Should be a + button first on the page', () => {
    expect(dh.singleText('button')).toBe('+');
  });

  it('Should navigate to / before + button click',
    () => {
      // find DebugElements with an attached RouterLinkStubDirective
      const location = TestBed.get(Location);
      expect(location.path()).toBe('');
    }
  );

  it('Should navigate to /add on + button click',
    () => {
      const router: Router = TestBed.get(Router);
      spyOn(router, 'navigateByUrl');
      dh.clickButton('+');
      expect(router.navigateByUrl).
        toHaveBeenCalledWith(router.createUrlTree(['/add']),
        { skipLocationChange: false, replaceUrl: false });
  });

  it('Should show One Unordered List Item', () => {
    expect(dh.count('ul')).toBe(1);
  });

  it('Should show no list item when no products are available', () => {
    expect(dh.count('li')).toBe(0);
  });

  it('Should show one list item when I have one product', () => {
    component.products = helper.getProducts(1);
    fixture.detectChanges();
    expect(dh.count('li')).toBe(1);
  });

  it('Should show 100 list item when I have 100 products', () => {
    component.products = helper.getProducts(100);
    fixture.detectChanges();
    expect(dh.count('li')).toBe(100);
  });

  it('Should show 100 Delete buttons, 1 pr. item', () => {
    component.products = helper.getProducts(100);
    fixture.detectChanges();
    expect(dh.countText('button', 'Delete')).toBe(100);
  });

  it('Should show 1 span pr product', () => {
    component.products = helper.getProducts(1);
    fixture.detectChanges();
    expect(dh.count('span')).toBe(1);
  });

  it('Should show 1 product name and id in span', () => {
    component.products = helper.getProducts(1);
    fixture.detectChanges();
    expect(dh.singleText('span'))
      .toBe(helper.products[0].name + ' -- ' + helper.products[0].id);
  });

  it('Should show 5 spans, 1 pr. product', () => {
    component.products = helper.getProducts(5);
    fixture.detectChanges();
    expect(dh.count('span')).toBe(5);
  });

  it('Should show 5 product names and ids in spans', () => {
    component.products = helper.getProducts(5);
    fixture.detectChanges();
    for (let i = 0; i < 5; i++) {
      const product = helper.products[i];
      expect(dh.countText('span', product.name + ' -- ' + product.id))
        .toBe(1);
    }
  });

  it('Should call deleteProduct once when we click Delete button', () => {
    component.products = helper.getProducts(1);
    fixture.detectChanges();
    spyOn(component, 'deleteProduct');
    dh.clickButton('Delete');
    expect(component.deleteProduct).toHaveBeenCalledTimes(1);
  });

  it('Should call deleteProduct with the product to delete when we click Delete button', () => {
    component.products = helper.getProducts(1);
    fixture.detectChanges();
    spyOn(component, 'deleteProduct');
    dh.clickButton('Delete');
    expect(component.deleteProduct).toHaveBeenCalledWith(helper.products[0]);
  });
});

class Helper {
  products: Product[] = [];
  getProducts(amount: number): Observable<Product[]> {
    for (let i = 0; i < amount; i++) {
      this.products.push(
        {id: 'abc' + i, name: 'item' + i, pictureId: 'def'}
      );
    }
    return of(this.products);
  }
}
