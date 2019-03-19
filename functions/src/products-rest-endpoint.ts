import * as express from 'express';

const app = express();

// View a contact
app.get('/:productId', (req, res) => {
  res.status(200).send('got it ' +  req.params.productId);
})
// View all contacts
app.get('', (req, res) => {
  res.status(200).send('There u goes')
})
// Add new contact
app.post('', (req, res) => {
  res.send('Create a new product');
})
// Update new contact
app.patch('/:productId', (req, res) => {
  res.send('Update a new product' + req.params.productId);
})
// Update new contact
app.put('/:productId', (req, res) => {
  res.send('Update a new product' + req.params.productId);
})
// Delete a contact
app.delete('/:productId', (req, res) => {
  res.send('Document deleted');
})

export = app;
