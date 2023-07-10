const express = require('express');
const router = express.Router();
const {createOffer,getoffer} = require('../controllers/offer');

router.post('/create-offer',createOffer);
router.get('/get-offers', getoffer)

module.exports = router ; 