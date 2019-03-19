import * as admin from 'firebase-admin';
import * as deleteProducts from './delete-products-function';
import * as productRest from './products-rest';
import * as restApi from './main-rest-endpoint';
import * as uploadNewProductImage from './upload-new-product-image-function';

admin.initializeApp();

module.exports = {
  ...deleteProducts,
  ...productRest,
  ...restApi,
  ...uploadNewProductImage
}
