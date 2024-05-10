-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seller" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "bankAccount" TEXT NOT NULL,
    CONSTRAINT "Seller_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Seller" ("bankAccount", "companyName", "username") SELECT "bankAccount", "companyName", "username" FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
CREATE TABLE "new_Purchase" (
    "purchaseId" TEXT NOT NULL PRIMARY KEY,
    "quantity" INTEGER NOT NULL,
    "totalPrice" REAL NOT NULL,
    "date" DATETIME NOT NULL,
    "itemId" TEXT NOT NULL,
    "customerUN" TEXT NOT NULL,
    CONSTRAINT "Purchase_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("itemId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Purchase_customerUN_fkey" FOREIGN KEY ("customerUN") REFERENCES "Customer" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Purchase" ("customerUN", "date", "itemId", "purchaseId", "quantity", "totalPrice") SELECT "customerUN", "date", "itemId", "purchaseId", "quantity", "totalPrice" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
CREATE TABLE "new_Customer" (
    "username" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "shippingAddress" TEXT NOT NULL,
    "moneyBalance" REAL NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    CONSTRAINT "Customer_username_fkey" FOREIGN KEY ("username") REFERENCES "User" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("email", "moneyBalance", "name", "phoneNumber", "shippingAddress", "surname", "username") SELECT "email", "moneyBalance", "name", "phoneNumber", "shippingAddress", "surname", "username" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE TABLE "new_Item" (
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "featured" BOOLEAN,
    "itemId" TEXT NOT NULL PRIMARY KEY,
    "sellerUN" TEXT NOT NULL,
    CONSTRAINT "Item_sellerUN_fkey" FOREIGN KEY ("sellerUN") REFERENCES "Seller" ("username") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("category", "description", "featured", "image", "itemId", "name", "price", "quantity", "sellerUN") SELECT "category", "description", "featured", "image", "itemId", "name", "price", "quantity", "sellerUN" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
