var dbconfig = require('../config/db.config');
const sql = require('mssql/msnodesqlv8');

// const authController = {
//   customerLogin : p
// }

//get all customers
async function getAllCustomers(){
  try {
    //create DB connection
    let pool = await sql.connect(dbconfig);
    let customers = await pool.request().query("SELECT * FROM Customers");
    return customers.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//get all customers by ID
async function getCustomerByID(customerID){
  try {
    let pool = await sql.connect(dbconfig);
    let customer = await pool.request()
      .input('customer_id', sql.Int, customerID)
      .query("SELECT * FROM Customers WHERE customer_id = @customer_id");
    return customer.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//Login Customer
async function loginCustomer(customer) {
  try {
    let pool = await sql.connect(dbconfig);
    let recentCustomer = await pool.request()
      .input('email', sql.NVarChar(50), customer.email)
      .input('password', sql.NVarChar(20), customer.password)
      .execute('LoginCustomer');
    console.log("Record exist");
    return recentCustomer.recordsets;
  } catch (error) {
    console.log(error);
  }
}

//Register a customer
async function addCustomer(customer) {
  try {
    let pool = await sql.connect(dbconfig);
    let newCustomer = await pool.request()
      .input('full_name', sql.NVarChar(50),customer.full_name)
      .input('dob', sql.Date, customer.dob)
      .input('email', sql.NVarChar(50),customer.email)
      .input('password', sql.NVarChar(20),customer.password)
      .execute('InsertCustomer'); //Use a Stored Procedure dbo.InsertCustomer
      // .query("INSERT INTO [dbo].[Customers]([full_name],[dob],[email],[password]) VALUES (@full_name,@dob,@email,@password)");
    console.log("Customer has been add successfully");
    return newCustomer.recordsets;
  } 
  catch (error) {
    return "e001"; //Da ton tai ten nguoi dung
  }
}




//Export MODULE
module.exports = {
  getAllCustomers,
  getCustomerByID,
  loginCustomer,
  addCustomer
}
