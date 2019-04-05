import {async, getTestBed, TestBed} from '@angular/core/testing';

import { ProductService } from './product.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreModule,
  DocumentChangeAction,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';
import {FileService} from '../../files/shared/file.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Observable, of} from 'rxjs';

describe('ProductService', () => {
  let angularFirestoreMock: any;
  let fileServiceMock: any;
  let fsCollectionMock: any;
  let httpMock: HttpTestingController;
  let service: ProductService;
  beforeEach(() => {
    angularFirestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);
    fsCollectionMock = jasmine.createSpyObj('collection', ['snapshotChanges', 'valueChanges']);
    angularFirestoreMock.collection.and.returnValue(fsCollectionMock);
    fsCollectionMock.snapshotChanges.and.returnValue(of([]));
    fileServiceMock = jasmine.createSpyObj('FileService', ['getFileUrl', 'upload']);

    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: AngularFirestore, useValue: angularFirestoreMock},
        {provide: FileService, useValue: fileServiceMock}
      ]
    });
    httpMock = getTestBed().get(HttpTestingController);
    service = TestBed.get(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProductsCalls', () => {
    beforeEach(() => {
      service.getProducts();
    });

    it('should call collection 1 time on AngularFirestore service', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledTimes(1);
    });

    it('should call collection with "products" as param', () => {
      expect(angularFirestoreMock.collection).toHaveBeenCalledWith('products');
    });

    it('should call snapshotChanges 1 time on AngularFirestore service', () => {
      expect(fsCollectionMock.snapshotChanges).toHaveBeenCalledTimes(1);
    });
  });
});
