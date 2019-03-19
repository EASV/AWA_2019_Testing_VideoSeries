import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddComponent } from './product-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ImageCropperModule} from 'ngx-image-cropper';
import {RouterTestingModule} from '@angular/router/testing';

describe('ProductAddComponent', () => {
  let component: ProductAddComponent;
  let fixture: ComponentFixture<ProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAddComponent ],
      imports: [
        ReactiveFormsModule,
        ImageCropperModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
