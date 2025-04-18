const express = require('express');
const router = express.Router();
const { recordSale, getSales } = require('../controllers/saleController');

router.post('/', recordSale);
router.get('/', getSales);

module.exports = router;