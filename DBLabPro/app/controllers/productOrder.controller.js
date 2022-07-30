var dbconfig = require('../config/db.config');
const sql = require('mssql/msnodesqlv8');

//POST a new order
async function addProductOrder(order) {
    try {
      let pool = await sql.connect(dbconfig);
      let newOrder = await pool.request()
        .input('order_id', sql.Int,order.order_id)
        .input('product_id', sql.Int,order.product_id)
        .input('order_quantity', sql.Int,order.order_quantity)
        // .execute('InsertOrder');
        .query("INSERT INTO [dbo].[ProductOrders]([order_id],[product_id],[order_quantity]) VALUES (@order_id,@product_id,@order_quantity)");
      console.log("Order of product has been add successfully");
      return newOrder.recordsets;
    } 
    catch (error) {
      return "e001"; //Loi khong xac dinh
    }
  }
//GET all Order
async function getAllProductOrders(){
    try {
      //create DB connection
      let pool = await sql.connect(dbconfig);
      let productOrders = await pool.request().query("SELECT * FROM ProductOrders");
      return productOrders.recordsets;
    } catch (error) {
      console.log(error);
    }
}
//Delete
async function deleteProductOrderByID(productID) {
    try {
        let pool = await sql.connect(dbconfig);
        let product = await pool.request()
          .input('product_id',sql.Int, productID)
          .query("DELETE FROM ProductOrders WHERE product_id = @product_id");
        return product.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addProductOrder,
    getAllProductOrders,
    deleteProductOrderByID
}