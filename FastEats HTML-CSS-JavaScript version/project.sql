CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(100) NOT NULL,
    UserType ENUM('Employee', 'Customer', 'Rider', 'Admin') NOT NULL
);
CREATE TABLE Feedback (
    FeedbackID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Rating INT,
    FoodQualityRating INT,
    DeliveryTimeRating INT,
    CustomerServiceRating INT,
    FeedbackText TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
CREATE TABLE CartItem (
    CartItemID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ItemID INT,
    Quantity INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ItemID) REFERENCES Menu(ItemID)
);
CREATE TABLE Menu (
    ItemID INT PRIMARY KEY AUTO_INCREMENT,
    ItemName VARCHAR(100) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE Reservation (
    ReservationID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    ReservationType ENUM('Dine-in', 'Pickup') NOT NULL,
    ReservationDateTime DATETIME NOT NULL,
    BranchID INT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (BranchID) REFERENCES Branches(BranchID)
);

CREATE TABLE Branch (
    BranchID INT PRIMARY KEY AUTO_INCREMENT,
    BranchName VARCHAR(100) NOT NULL,
    Location VARCHAR(255) NOT NULL
);
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    OrderDateTime DATETIME NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    PaymentMethod ENUM('Credit/Debit Card', 'Mobile Wallet', 'Cash on Delivery') NOT NULL,
    OrderStatus ENUM('Pending', 'Confirmed', 'In Progress', 'Out for Delivery', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
CREATE TABLE OrderItem (
    OrderItemID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ItemID INT,
    Quantity INT,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ItemID) REFERENCES Menu(ItemID)
);


CREATE PROCEDURE AuthenticateUser(
    IN p_username_email VARCHAR(100),
    IN p_password VARCHAR(100)
)
BEGIN
    SELECT UserID, UserType
    FROM Users
    WHERE (Username = p_username_email OR Email = p_username_email)
    AND Password = p_password;
END ;

CREATE PROCEDURE AddToCart(
    IN p_user_id INT,
    IN p_item_id INT,
    IN p_quantity INT
)
BEGIN
    INSERT INTO CartItem (UserID, ItemID, Quantity)
    VALUES (p_user_id, p_item_id, p_quantity);
END  

CREATE PROCEDURE PlaceOrder(
    IN p_user_id INT,
    IN p_payment_method ENUM('Credit/Debit Card', 'Mobile Wallet', 'Cash on Delivery')
)
BEGIN
    DECLARE total_amount DECIMAL(10, 2);
    DECLARE order_id INT;

    -- Calculate total amount from cart items
    SELECT SUM(m.Price * ci.Quantity)
    INTO total_amount
    FROM CartItem ci
    JOIN Menu m ON ci.ItemID = m.ItemID
    WHERE ci.UserID = p_user_id;

    -- Insert order into Orders table
    INSERT INTO Orders (UserID, OrderDateTime, TotalAmount, PaymentMethod)
    VALUES (p_user_id, NOW(), total_amount, p_payment_method);

    -- Get the OrderID of the inserted order
    SELECT LAST_INSERT_ID() INTO order_id;

    -- Move items from cart to order items
    INSERT INTO OrderItem (OrderID, ItemID, Quantity)
    SELECT order_id, ItemID, Quantity
    FROM CartItem
    WHERE UserID = p_user_id;

    -- Clear the user's cart
    DELETE FROM CartItem WHERE UserID = p_user_id;
END  