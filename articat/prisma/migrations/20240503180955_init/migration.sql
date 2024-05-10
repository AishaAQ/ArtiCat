-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "moneyBalance" REAL NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    CONSTRAINT "Customer_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Seller" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    CONSTRAINT "Seller_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Item" (
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "itemId" TEXT NOT NULL PRIMARY KEY,
    "sellerUN" TEXT NOT NULL,
    CONSTRAINT "Item_sellerUN_fkey" FOREIGN KEY ("sellerUN") REFERENCES "Seller" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Purchase" (
    "purchaseId" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "totalPrice" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "itemId" TEXT NOT NULL,
    "customerUN" TEXT NOT NULL,
    CONSTRAINT "Purchase_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("itemId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Purchase_customerUN_fkey" FOREIGN KEY ("customerUN") REFERENCES "Customer" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);
