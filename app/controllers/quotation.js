import express from 'express';
import { Quotation } from '../models/quotation.js';
import { Like } from 'typeorm'
const router = express.Router();

export default function(app) {
  app.use('/', router);
};

router.get('/new-quotation', function(req, res) {
    res.render('quotation/new-quotation');
});

router.get('/quotations', async function(req, res) {

  var quotations = await Quotation.find();
  res.render('quotation/list', { quotations: quotations} );
});


router.post('/quotation', async function(req, res) {

    var reqData = req.body;
       var quotation = new Quotation();
    Object.assign(quotation, reqData);
    quotation = await quotation.save();
    res.json(quotation);
});


router.get('/api/quotes', async (req, res, next) => {
  var page = Math.min(1,req.query.page);
  var search = req.query.search || '';
  let start = (page - 1) *  10;
  console.log(start);
  let query = {
    where: { name: Like("%"+search +"%")}
  };
  var count = await Quotation.count(query);
  query.skip = start;
  query.take = 10;
  var quotes = await Quotation.find(query);
  res.json({
    count,
    quotes
  });
});