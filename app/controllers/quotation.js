import express from 'express';
import { Quotation, QuotationProduct } from '../models/quotation.js';
import typeorm from 'typeorm';
import { isAuthenticated } from '../../config/passport.js'
import { ProductResponse } from '../models/quotation-reponse.js';
import { Product } from '../models/product.js';

const { Like } = typeorm;
const router = express.Router();

export default function(app) {
  app.use('/', router);
};

router.get('/new-quotation', isAuthenticated, function(req, res) {
    res.render('quotation/new-quotation');
});

router.get('/edit-quotation', isAuthenticated, function(req, res) {
  res.render('quotation/edit');
});

router.get('/edit-quotation-reply', isAuthenticated, function(req, res) {
  res.render('quotation/quotation-reply', {layout: "main-supplier"});
});

router.get('/quotations', isAuthenticated, async function(req, res) {

  var quotations = await Quotation.find();
  var layout = "main";
  if (req.user.supplier){
    layout = "main-supplier";

  }
  var view = 'quotation/list';
  if(req.user.supplier)
    view ='quotation/list-supplier';
  res.render(view, { layout, quotations: quotations} );

});


router.post('/quotation', async function(req, res) {

    var reqData = req.body;
       var quotation = new Quotation();
    Object.assign(quotation, reqData);
    quotation = await quotation.save();
    res.json(quotation);
});


router.get('/api/quotes', isAuthenticated, async (req, res, next) => {
  var page = Math.max(1,req.query.page);
  var state = req.query.state;
  var search = req.query.search || '';
  let start = (page - 1) *  10;
  console.log(start);
  let query = {where:{}};
  if(search){
    query.where.name = Like("%"+search +"%");
  }
  if(state){
    query.where.state = state;
  }
  var count = await Quotation.count(query);
  query.skip = start;
  query.take = 10;
  var quotes = await Quotation.find(query);
  res.json({
    count,
    quotes
  });
  res.status(200);
});

router.get('/api/quotes/:id', async (req, res, next) => {
  var id = req.params.id || 0;
  console.log(req.params);
  var quote = await Quotation.findOne(id,  { relations: [ 'products', 'products.product', 'products.buyer']});
  res.json(quote);
});


router.delete('/api/quotes/:id', async (req, res, next) => {
    var id = req.params.id || 0;
    console.log(req.params);
    var quote = await Quotation.delete({id:id});
    res.json({delete:true});
 });


 router.get('/api/quotes/:id/responses', isAuthenticated, async (req, res, next) => {
  var id = req.params.id || 0;
  console.log(req.params);
  var requests = await QuotationProduct.createQueryBuilder('qp')
    .select(['qp."productId"', 'pd.name as name', 'sum(quantity) as quantity'])
    .where("qp.quotationId = :id", { id: id })
    .groupBy(['qp.productId','pd.name'])
    .innerJoin('qp.product', 'pd')
    .getRawMany()

    var responses = await ProductResponse.find({ where: { supplier:{ id :req.user.id }, quotationId: id }})

    res.json({requests,responses});
});

router.post('/api/quotes/:id/responses', isAuthenticated, async (req, res, next) => {
  var id = req.params.id || 0;
  var responses = req.body;
  var savedResponses = [];
  for( var i = 0; i < responses.length; i++){
    var response = new ProductResponse();
    Object.assign(response, responses[i]);
    response = await response.save();
    savedResponses.push(response)
  }
  res.json(savedResponses);
})

