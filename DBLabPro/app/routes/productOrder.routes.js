module.exports = app => {
    const productOrders = require('../controllers/productOrder.controller');
    const router = require('express').Router();

    app.use('/api/productOrders',router);

    //POST a new Product
    router.route('/').post((req,res) => {
        let order = {...req.body};
        productOrders.addProductOrder(order).then(result => {
            res.json(result);
        });
    })

    router.route('/').get((req,res) => {
        productOrders.getAllProductOrders().then(result => {
            res.json(result);
        });
    })

    //DELETE a Product by id
    router.route('/:productID').delete((req,res) => {
        productOrders.deleteProductOrderByID(req.params.productID).then(result => {
            res.json(result);
        })
    });
}