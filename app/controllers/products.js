import express from 'express';
import { Product } from '../models/product.js'
const router = express.Router();

export default function(app) {
  app.use('/api/products', router);
};

router.get('/', async function(req, res) {
    var produts = await Product.find()  
    res.json(produts);
});