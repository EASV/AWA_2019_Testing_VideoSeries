import {async, ComponentFixture, fakeAsync, inject, TestBed} from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import {ProductService} from '../shared/product.service';
import {FileService} from '../../files/shared/file.service';
import {Observable, of} from 'rxjs';
import {Product} from '../shared/product.model';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {Component} from '@angular/core';
import {Location} from '@angular/common';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductsListComponent,
        DummyComponent
      ],
      imports: [
        RouterTestingModule.withRoutes(
          [
            { path: 'add', component: DummyComponent }
          ]
        )
      ],
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

  it('should contain an h2 tag', () => {
    const h2Ele = fixture.debugElement.query(By.css('h2'));
    const h2HTMLElement: HTMLHeadElement = h2Ele.nativeElement;
    expect(h2HTMLElement.textContent)
      .toBe('List all Products');
  });

  it('Should minimum be one button on the page', () => {
    // find DebugElements with an attached RouterLinkStubDirective
    const buttons = fixture.debugElement
      .queryAll(By.css('button'));
    expect(buttons.length >= 1).toBeTruthy();
  });

  it('Should be a + button first on the page', () => {
    // find DebugElements with an attached RouterLinkStubDirective
    const linkDes = fixture.debugElement
      .queryAll(By.css('button'));
    const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
    expect(nativeButton.textContent).toBe('+');
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
      const location = TestBed.get(Location);
      const linkDes = fixture.debugElement
        .queryAll(By.css('button'));
      const nativeButton: HTMLButtonElement = linkDes[0].nativeElement;
      nativeButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(location.path()).toBe('/add');
      });
  });

  it('Should show One Unordered List Item', () => {
    const unorderedList = fixture.debugElement
      .queryAll(By.css('ul'));
    expect(unorderedList.length).toBe(1);
  });

  it('Should show no list item when no products are available', () => {
    const listItem = fixture.debugElement
      .queryAll(By.css('li'));
    expect(listItem.length).toBe(0);
  });

  it('Should show one list item when I have one product', () => {
    component.products = of([
      {id: 'abc', name: 'item1', pictureId: 'def'}
    ]);
    fixture.detectChanges();
    const listItem = fixture.debugElement
      .queryAll(By.css('li'));
    expect(listItem.length).toBe(1);
  });

  it('Should show 100 list item when I have 100 products', () => {
    const products: Product[] = [];
    for (let i = 0; i < 100; i++) {
      products.push(
        {id: 'abc' + i, name: 'item1', pictureId: 'def'}
      );
    }
    component.products = of(products);
    fixture.detectChanges();
    const listItem = fixture.debugElement
      .queryAll(By.css('li'));
    expect(listItem.length).toBe(100);
  });

  it('Should show 100 delete buttons, 1 pr. item', () => {
    const products: Product[] = [];
    for (let i = 0; i < 100; i++) {
      products.push(
        {id: 'abc' + i, name: 'item1', pictureId: 'def'}
      );
    }
    component.products = of(products);
    fixture.detectChanges();
    let listItem = fixture.debugElement
      .queryAll(By.css('button'));
    // remove add button
    listItem = listItem.slice(1, listItem.length);
    expect(listItem.length).toBe(100);
  });

  it('Should show 1 product name and id in span', () => {
    const product  = {id: 'abc', name: 'item', pictureId: 'def'};
    component.products = of([product]);
    fixture.detectChanges();
    const spanItems = fixture.debugElement
      .queryAll(By.css('span'));
    expect(spanItems.length).toBe(1);
    const span = spanItems[0];
    const spanElement: HTMLSpanElement = span.nativeElement;
    expect(spanElement.textContent)
      .toBe(product.name + ' -- ' + product.id);
  });

  it('Should show 5 product names and ids in spans', () => {
    const products: Product[] = [];
    for (let i = 0; i < 5; i++) {
      products.push(
        {id: 'abc' + i, name: 'item' + i, pictureId: 'def'}
      );
    }
    component.products = of(products);
    fixture.detectChanges();
    const spanItems = fixture.debugElement
      .queryAll(By.css('span'));
    expect(spanItems.length).toBe(5);
    for (let i = 0; i < 5; i++) {
      const span = spanItems[i];
      const product = products[i];
      const spanElement: HTMLSpanElement = span.nativeElement;
      expect(spanElement.textContent)
        .toBe(product.name + ' -- ' + product.id);
    }
  });
});

@Component({ template: '' })
class DummyComponent {}

class ProductServiceStub {
  getProducts(): Observable<Product[]> {
    return of([]);
  }
}

class FileServiceStub {}
