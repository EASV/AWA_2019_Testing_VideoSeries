import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {switchMap} from 'rxjs/operators';
import {ProductService} from '../shared/product.service';
import {FileService} from '../../files/shared/file.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ImageCroppedEvent} from 'ngx-image-cropper';
import {FileMetadata} from '../../files/shared/file-metadata';
import {ImageMetadata} from '../../files/shared/image-metadata';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  productFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private ps: ProductService) {
    this.productFormGroup = new FormGroup({
     name: new FormControl('')
    });
  }

  ngOnInit() {
  }

  addProduct() {
    const productData = this.productFormGroup.value;
    this.ps.addProductWithImage(
      productData,
      this.getMetaDataForImage()
    ).subscribe(product => {
      this.router.navigate(['../'],
        {relativeTo: this.activatedRoute});
      // window.alert('product with id: ' + product.id + ' and name : ' + product.name + 'is added');
    },
        error1 => {
          window.alert('Bad stuff happened: ' + error1);
        });
  }

  private getMetaDataForImage(): ImageMetadata {
    if (this.imageChangedEvent && this.imageChangedEvent.target &&
      this.imageChangedEvent.target.files &&
      this.imageChangedEvent.target.files.length > 0) {
      const fileBeforeCrop = this.imageChangedEvent.target.files[0];
      return {
        base64Image: this.croppedImage,
        imageBlob: this.croppedBlob,
        fileMeta: {
          name: fileBeforeCrop.name,
          type: 'image/png',
          size: fileBeforeCrop.size
        }
      };
    }
    return undefined;
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
    // Going away soon.. Bye bye..
    // this.fileToUpload = event.target.files[0];
  }

  imageCropped(event: ImageCroppedEvent) {
    // Preview
    this.croppedImage = event.base64;
    this.croppedBlob = event.file;
  }

}
