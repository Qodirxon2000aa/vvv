const express = require('express');
const router = express.Router();
const { getAllQarz, createQarz, updateQarz, deleteQarz } = require('../controllers/qarzController');

router.get('/', getAllQarz);
router.post('/', createQarz);
router.put('/:id', updateQarz);
router.delete('/:id', deleteQarz);

module.exports = router;