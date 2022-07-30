var dbconfig = require('../config/db.config');
const sql = require('mssql/msnodesqlv8');


/**
 * Get all Product
 * @returns 
 */
async function getAllProducts() {
    try {
        let pool = await sql.connect(dbconfig);
        let product = await pool.request().query("SELECT * FROM Products");
        return product.recordsets;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Delete a Product
 */
async function deleteProductByID(productID) {
    try {
        let pool = await sql.connect(dbconfig);
        let product = await pool.request()
          .input('product_id',sql.Int, productID)
          .query("DELETE FROM Products WHERE product_id = @product_id");
        return product.recordsets;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Update a product quantity
 */
async function updateProductByID(productID,product) {
    try {
        let pool = await sql.connect(dbconfig);
        let newProduct = await pool.request()
          .input('product_id',sql.Int, productID)
          .input('quantity',sql.Int,product.quantity)
          .query("UPDATE Products SET quantity = @quantity WHERE product_id = @product_id");
        return newProduct.recordsets;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get product by id
 */

 async function getProductByID(productID) {
    try {
        let pool = await sql.connect(dbconfig);
        let product = await pool.request()
          .input('product_id',sql.Int, productID)
          .query("SELECT * FROM Products WHERE product_id = @product_id");
        return product.recordsets;
    } catch (error) {
        console.log(error);
    }
}

/**
 * Add a new Product
 */
 async function addProduct(product) {
    try {
        let pool = await sql.connect(dbconfig);
        let newProduct = await pool.request()
          .input('product_name',sql.NVarChar(50),product.product_name)
          .input('price',sql.Int,product.price)
          .input('quantity',sql.Int,product.quantity)
          .input('product_image',sql.VarChar(500),product.product_image)
          .query("INSERT INTO [dbo].[Products]([product_name],[price],[quantity],[product_image]) VALUES (@product_name,@price,@quantity,@product_image)");
        return newProduct.recordsets;
    } catch (error) {
        return "e001";//trung ten san pham
    } 
}



module.exports = {
    getAllProducts,
    deleteProductByID,
    addProduct,
    updateProductByID,
    getProductByID
}