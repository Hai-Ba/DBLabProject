CREATE DATABASE ECommercialDB;

-------------------------------------------------------------------
--ADMIN TABLE
CREATE TABLE Admins(
	email NVARCHAR(50) PRIMARY KEY,
	password NVARCHAR(20)
);

INSERT INTO Admins
VALUES
('admin001','admin')

-------------------------------------------------------------------
--CUSTOMER TABLE
CREATE TABLE Customers(
	customer_id INT IDENTITY(1,1) PRIMARY KEY,
	full_name NVARCHAR(50),
	dob DATE,
	email NVARCHAR(50) UNIQUE,
	password NVARCHAR(20)
);

INSERT INTO Customers
VALUES
(N'Trần Thị Hương','16-08-2001','huong1608@gmail.com','123456'),
(N'Đỗ Bá Long','02-09-2001','long0209@gmail.com','123456'),
(N'Nguyễn Bá Hải','12-12-2001','haixinhtrai1212@gmail.com','123456')

-------------------------------------------------------------------
--PRODUCT TABLE
CREATE TABLE Products(
	product_id INT IDENTITY(1,1) PRIMARY KEY,
	product_name NVARCHAR(50) UNIQUE,
	price INT, --In USD
	quantity INT,
	product_image VARCHAR(500) --SAVE picture file in assets/image folder of project to use
);
INSERT INTO Products
VALUES
(N'Yasuo',100,20,'yasuo.jpg'),
(N'Leesin',200,20,'leesin.jpg'),
(N'Zed',50,20,'zed.jpg')

-------------------------------------------------------------------
--ORDER TABLE
CREATE TABLE Orders(
	order_id INT IDENTITY(1,1) PRIMARY KEY,
	date DATE DEFAULT GETDATE(),
	total_price INT,
	customer_id INT FOREIGN KEY REFERENCES Customers(customer_id)
);

INSERT INTO Orders
VALUES
(300,1)

-------------------------------------------------------------------
--PRODUCTORDER TABLE
CREATE TABLE ProductOrders(
	order_id INT FOREIGN KEY REFERENCES Orders(order_id),
	product_id INT FOREIGN KEY REFERENCES Products(product_id),
	order_quantity INT,
	CONSTRAINT pk_productorders PRIMARY KEY(order_id, product_id)
);

INSERT INTO ProductOrders
VALUES
(1,1,1),
(1,2,1)

---------------------------------------------------------------------
--QUERY--
--Customers
SELECT * FROM Customers WHERE customer_id = @customer_id
--Orders
SELECT * FROM Orders
--Products
SELECT * FROM Products
--ProductOrders
SELECT * FROM ProductOrders
--GET all Customers and their Orders
SELECT full_name, email, order_id, date, total_price
FROM Orders, Customers
WHERE Orders.customer_id = Customers.customer_id;

---------------------------------------------------------------------
--STORE PROCEDURE USE-----
--INSERT ADMIN
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
CREATE PROCEDURE InsertAdmin 
	-- Add the parameters for the stored procedure here
	@email nvarchar(50),
	@password nvarchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Admins (email, password) VALUES (@email, @password)
END
GO

--REGISTER CUSTOMER-----
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
CREATE PROCEDURE InsertCustomer
	-- Add the parameters for the stored procedure here
	@full_name nvarchar(50),
	@dob date,
	@email nvarchar(50),
	@password nvarchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO dbo.Customers (full_name,dob,email,password) VALUES (@full_name,@dob,@email,@password)
	SELECT * FROM Customers WHERE full_name = @full_name AND dob=@dob AND email=@email AND password=@password
END
GO

--UPDATE NEW ORDER-----
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
CREATE PROCEDURE InsertOrder
	-- Add the parameters for the stored procedure here
	@total_price INT ,
	@customer_id INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	INSERT INTO Orders (total_price,customer_id) VALUES (@total_price,@customer_id);
	SELECT MAX(order_id) FROM Orders;
END
GO

--LOGIN USER
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
CREATE PROCEDURE LoginCustomer
	-- Add the parameters for the stored procedure here
	@email nvarchar(50),
	@password nvarchar(20)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * FROM Customers WHERE email = @email AND password = @password
END
GO



