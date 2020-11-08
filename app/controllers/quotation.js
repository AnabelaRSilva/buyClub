import express from 'express';
import passport from 'passport'; 
import { User } from '../models/article.js';
const router = express.Router();

export default function(app) {
  app.use('/', router);
};

router.get('/new-quotation', 

    function(req, res) {
        res.render('quotation/new-quotation');
});