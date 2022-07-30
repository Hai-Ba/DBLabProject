module.exports = app => {
    const admins = require("../controllers/admin.controller.js");
    var router = require("express").Router();
    //Use api
    app.use('/api/admins',router);

    //Create a new Admin***POST***
    router.route('/').post((req,res) => {
        let admin = {...req.body};
        admins.addAdmin(admin).then(result => {
            res.status(201).json(result);
        });
    });

    //Login ADmin
    router.route('/login').post((req,res) => {
        let admin = {...req.body};
        admins.loginAdmin(admin).then(result => {
            res.json(result);
        });
    });
    
    //Retrieve all Admins***GET***
    router.route('/').get((req,res) => {
        admins.getAllAdmins().then(result => {
            res.status(201).json(result);
        });
    });
};