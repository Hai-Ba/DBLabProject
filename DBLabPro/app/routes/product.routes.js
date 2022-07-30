module.exports = app => {
    const products = require('../controllers/product.controller');
    const router = require('express').Router();

    app.use('/api/products',router);

    //GET all product
    router.route('/').get((req,res) => {
        products.getAllProducts().then(result => {
            res.json(result);
        });
    });

    //DELETE a Product by id
    router.route('/:productID').delete((req,res) => {
        products.deleteProductByID(req.params.productID).then(result => {
            res.json(result);
        })
    });

    //POST a new Product
    router.route('/').post((req,res) => {
        let product = {...req.body};
        products.addProduct(product).then(result => {
            res.json(result);
        });
    })

    //PUT modified new product
    router.route('/:productID').put((req,res) => {
        let product = {...req.body};
        products.updateProductByID(req.params.productID,product).then(result => {
            res.json(result);
        })
    });

    //GET a product by id
    router.route('/:productID').get((req,res) => {
        products.getProductByID(req.params.productID).then(result => {
            res.json(result);
        })
    });
}