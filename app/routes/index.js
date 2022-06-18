const express = require('express');
const productRoute = require('../controllers/product.controller');
const merchantRoute = require('../controllers/merchant.controller');
const loginRoute = require('../controllers/login.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

router.post('/login', loginRoute.login);

router.get('/product', authMiddleware.isAuthenticate, productRoute.listProduct);
router.get('/product/:id', authMiddleware.isAuthenticate, productRoute.detailProduct);
router.post('/product', authMiddleware.isAuthenticate, productRoute.insertProduct);
router.put('/product/:id', authMiddleware.isAuthenticate, productRoute.updateProduct);
router.delete('/product/:id', authMiddleware.isAuthenticate, productRoute.deleteProduct);

router.get('/merchant', authMiddleware.isAuthenticate, merchantRoute.listMerchant);
router.get('/merchant/:id', authMiddleware.isAuthenticate, merchantRoute.detailMerchant);
router.post('/register', merchantRoute.insertMerchant);
router.delete('/merchant/:id', authMiddleware.isAuthenticate, merchantRoute.deleteMerchant);

module.exports = router;