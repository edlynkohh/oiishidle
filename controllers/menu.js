// DEPENDENCIES
const express = require('express');
const router = express.Router();
const Product = require('../models/products');

// ROUTES
// get index
router.get('/', (req, res) => {
    res.render('menu/index.ejs', {
        
    });
});

// EXPORT
module.exports = router;