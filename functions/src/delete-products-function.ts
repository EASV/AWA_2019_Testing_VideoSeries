import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

exports.deleteProduct = functions.firestore
  .document('products/{productID}')
  .onDelete((snap, context) => {
    return new Promise( async (resolve, reject) => {
      const deletedProduct = snap.data();
      if(deletedProduct) {
        try{
          await admin.firestore().collection('files')
            .doc(deletedProduct.pictureId)
            .delete()
            .then();

          const restultFromStorage = await admin.storage()
            .bucket().file('product-pictures/' + deletedProduct.pictureId)
            .delete()
            .then()

          resolve(restultFromStorage);
        } catch (e) {
          reject(e);
        }


        /*
        admin.firestore().collection('files')
          .doc(deletedProduct.pictureId)
          .delete()
          .then(value => {
              admin.storage()
                .bucket().file('product-pictures/' + deletedProduct.pictureId)
                .delete()
                .then(res => resolve(res), err => reject(err))
                .catch(err => reject(err))
            },
            err => reject(err))
          .catch(err => reject(err))*/
      } else {
        reject('No product deleted');
      }

    });
  });
