module.exports = app => {
    const orders = require('../controllers/order.controller');
    const router = require('express').Router();

    app.use('/api/orders',router);

    //POST a new Product
    router.route('/').post((req,res) => {
        let order = {...req.body};
        orders.addOrder(order).then(result => {
            res.json(result);
        });
    })

    router.route('/').get((req,res) => {
        orders.getAllOrders().then(result => {
            res.json(result);
        });
    })
}