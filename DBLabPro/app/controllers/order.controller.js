var dbconfig = require('../config/db.config');
const sql = require('mssql/msnodesqlv8');

//POST a new order
async function addOrder(order) {
    try {
      let pool = await sql.connect(dbconfig);
      let newOrder = await pool.request()
        .input('total_price', sql.Int,order.total_price)
        .input('customer_id', sql.Int,order.customer_id)
        .execute('InsertOrder');
        // .query("INSERT INTO [dbo].[Orders]([total_price],[customer_id]) VALUES (@total_price,@customer_id)");
      console.log("Order has been add successfully");
      return newOrder.recordset[0][""];
    } 
    catch (error) {
      return "e001"; //Loi khong xac dinh
    }
  }
//GET all Order
async function getAllOrders(){
    try {
      //create DB connection
      let pool = await sql.connect(dbconfig);
      let orders = await pool.request().query("SELECT * FROM Orders");
      return orders.recordsets;
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {
    addOrder,
    getAllOrders
}