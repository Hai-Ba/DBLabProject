var dbconfig = require('../config/db.config');
const sql = require('mssql/msnodesqlv8');

//Add Admin
async function addAdmin(admin) {
    try {
        let pool = await sql.connect(dbconfig);
        let newAdmin = await pool.request()
        .input('email',sql.NVarChar(50),admin.email)
        .input('password',sql.NVarChar(20),admin.password)
        .execute('InsertAdmin');
    console.log("Admin has been add successfully");
    return newAdmin.recordsets;
    } catch (error) {
        console.log(error);
    }
}

//Login Admin
async function loginAdmin(admin) {
    try {
      let pool = await sql.connect(dbconfig);
      let recentAdmin = await pool.request()
        .input('email', sql.NVarChar(50), admin.email)
        .input('password', sql.NVarChar(20), admin.password)
        .query("SELECT * FROM Admins WHERE email = @email AND password = @password");
      return recentAdmin.recordsets;
    } catch (error) {
      console.log(error);
    }
}

//Get all Admin
async function getAllAdmins(){
    try {
      //create DB connection
      let pool = await sql.connect(dbconfig);
      let admins = await pool.request().query("SELECT * FROM Admins");
      return admins.recordsets;
    } catch (error) {
      console.log(error);
    }
  }
module.exports = {
    addAdmin,
    loginAdmin,
    getAllAdmins
}