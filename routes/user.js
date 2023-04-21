const express = require('express');
const {  addproduct } = require('../controllers/admincontroller');
const { getproducts,getproduct } = require('../controllers/usercontroller');
const router = express.Router();
router.get('/products', getproducts);
router.get('/product/:slug', getproduct);
router.post('/products', addproduct);
module.exports = router;
