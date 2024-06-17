-- Crear la base de datos
CREATE DATABASE almacen;
GO

-- Usar la base de datos
USE almacen;
GO

-- Crear la tabla de productos
CREATE TABLE Products (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255),
    Price DECIMAL(18, 2) NOT NULL,
    Stock INT NOT NULL,
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NOT NULL DEFAULT GETDATE()
);
GO

-- Crear la tabla de usuarios con enumeración para roles basada en cadenas
CREATE TABLE Users (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Role NVARCHAR(20) NOT NULL CHECK (Role IN ('comun', 'admin')) DEFAULT 'comun',
    CreatedAt DATETIME NOT NULL DEFAULT GETDATE(),
    UpdatedAt DATETIME NULL
);
GO

-- Insertar productos iniciales
INSERT INTO Products (Name, Description, Price, Stock)
VALUES 
('Laptop', 'High performance laptop', 1200.00, 50),
('Smartphone', 'Latest model smartphone', 800.00, 200),
('Headphones', 'Noise-cancelling headphones', 150.00, 300),
('Monitor', '24 inch LED monitor', 250.00, 100),
('Keyboard', 'Mechanical keyboard', 100.00, 150),
('Mouse', 'Wireless mouse', 25.00, 500),
('Printer', 'Laser printer', 200.00, 70),
('Tablet', 'Android tablet', 300.00, 120),
('Webcam', 'HD webcam', 75.00, 250),
('Speakers', 'Bluetooth speakers', 60.00, 400),
('Router', 'WiFi router', 80.00, 180),
('External Hard Drive', '1TB external hard drive', 90.00, 130),
('Flash Drive', '64GB USB flash drive', 20.00, 600),
('SSD', '500GB SSD', 150.00, 90),
('Graphics Card', 'High-end graphics card', 700.00, 40),
('Power Supply', '750W power supply', 110.00, 60),
('Motherboard', 'Gaming motherboard', 200.00, 80),
('RAM', '16GB DDR4 RAM', 75.00, 200),
('CPU', 'Latest gen CPU', 400.00, 50),
('Cooling Fan', 'High performance cooling fan', 35.00, 150),
('Case', 'ATX PC case', 100.00, 70),
('Smart Watch', 'Waterproof smart watch', 150.00, 110),
('VR Headset', 'Virtual reality headset', 300.00, 30),
('Drone', 'Quadcopter drone', 500.00, 25),
('Camera', 'Digital SLR camera', 900.00, 15),
('Lens', '50mm camera lens', 200.00, 40),
('Tripod', 'Professional camera tripod', 100.00, 80),
('Gaming Chair', 'Ergonomic gaming chair', 250.00, 60),
('Desk', 'Adjustable standing desk', 300.00, 50),
('Monitor Stand', 'Dual monitor stand', 50.00, 100);
GO
