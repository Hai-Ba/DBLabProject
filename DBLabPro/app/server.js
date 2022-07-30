const express = require("express");
const cors = require("cors");
const bodyParser =  require("body-parser");
const app = express();
var corsOptions = {
    origin: "http://127.0.0.1:5500"
};

// //parse request of content-type : application/json
// app.use(express.json());  //Make the program cannot run!!!!
// //parse request of content-type : application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

//simple route
app.get("/",(req,res)=> {
    res.json({message: "E-commercial"});
});

require("./routes/customer.routes.js")(app);
require("./routes/admin.routes.js")(app);
require("./routes/product.routes.js")(app);
require("./routes/order.routes.js")(app);
require("./routes/productOrder.routes.js")(app);
//set port
const port = process.env.PORT || 8080;
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}.`);
})