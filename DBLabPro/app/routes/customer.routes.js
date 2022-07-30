module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
    const router = require("express").Router();
    //Use api
    app.use('/api/customers',router);

    //Register a new Customer***POST***
    router.route('/register').post((req,res) => {
        let customer = {...req.body};
        customers.addCustomer(customer).then(result => {
            res.status(201).json(result);
        });
    });

    //Login API od Customer
    router.route('/login').post((req,res) => {
        let customer = {...req.body};
        customers.loginCustomer(customer).then(result => {
            res.json(result);
        });
    });
    
    //Retrieve all Customers***GET***
    router.route('/').get((req,res) => {
        customers.getAllCustomers().then(result => {
            res.json(result);
        });
    });
    //Retrieve Customer with ID***GET***
    router.route('/:customerID').get((req,res) => {
        customers.getCustomerByID(req.params.customerID).then(result => {
            res.json(result);
        });
    });
};