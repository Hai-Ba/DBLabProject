create DATABASE ECommercialDB;

create TABLE Customers(
	customer_id INT IDENTITY(1, 1) PRIMARY KEY,
	full_name NVARCHAR(50),
	dob DATE,
	email NVARCHAR(50) UNIQUE,
	password NVARCHAR(20)
);

insert into Customers
values
(N'Trần Thị Hương','16-08-2001','huong1608@gmail.com','123456')
(N'Đỗ Bá Long','02-09-2001','long0209@gmail.com','123456')
(N'Nguyễn Bá Hải','12-12-2001','haixinhtrai1212@gmail.com','123456')


DROP TABLE Customers


create TABLE Orders(
	order_id INT IDENTITY(1, 1) PRIMARY KEY,
	date DATE DEFAULT GETDATE(),
	total_price INT,
	customer_id INT FOREIGN KEY REFERENCES Customers(customer_id)
);

DROP TABLE Orders

create TABLE Products(
	product_id INT IDENTITY(1, 1) PRIMARY KEY,
	product_name NVARCHAR(50),
	price INT,
	quantity INT
);

DROP TABLE Products

create TABLE ProductOrders(
	order_id INT FOREIGN KEY REFERENCES Orders(order_id),
	product_id INT FOREIGN KEY REFERENCES Products(product_id),
	order_quantity INT,
	CONSTRAINT pk_productorders PRIMARY KEY(order_id, product_id)
);

DROP TABLE ProductOrders

create TABLE Admins(
	admin_account NVARCHAR(50) PRIMARY KEY,
	password NVARCHAR(20)
);

DROP TABLE Admins
