import express from 'express';
import typeorm from 'typeorm';
import { isAuthenticated } from '../../config/passport.js'
import { ProductResponse } from '../models/quotation-response.js';
import { Quotation } from '../models/quotation.js';
import { User } from '../models/user.js';


const {Like,  In, Raw } = typeorm;

const router = express.Router();

export default function(app) {
  app.use('/', router);
};

router.get('/create-orders', isAuthenticated, function(req, res) {
    res.render('order/create');
});

router.get('/api/order/new', isAuthenticated, async function(req, res) {

    var quotationId = req.query.quotationId;
    var responses = await ProductResponse.find({where: { quotationId: quotationId, chose: true}}, { relations: [ 'supplier' ] });
    var quotation =  await Quotation.findOne({where: { id: quotationId }, relations: ['products', 'products.product', 'products.buyer']});
    var orders = [];
    
    for (let i = 0; i < responses.length; i++) {
        const response = responses[i];
        const requests = quotation.products.filter(c=>c.productId == response.productId);
        for (let j = 0; j < requests.length; j++) {
            const request = requests[j];
            var currentOrder = orders.find(c=>c.buyerId == request.buyerId && c.supplierId == response.supplierId);
            if(currentOrder == null)
            {
                currentOrder = new Order();
                currentOrder.data = new Date();
                currentOrder.supplier = response.supplier;
                currentOrder.buyer = request.buyer;
                
                currentOrder.products = [];
                orders.push(currentOrder);    
            }
            let orderProduct = new OrderProduct();
            orderProduct.product = request.product;
            orderProduct.quantity = request.quantity;
            orderProduct.price = response.price;
            currentOrder.products.push(product);

        }
    }
    res.json({orders: orders});
});