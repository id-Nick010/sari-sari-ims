/*
1. import
2. open database w/ name
3. init tables in db 

*/

import * as SQLite from "expo-sqlite";

export const openDB = async () => {
  return await SQLite.openDatabaseAsync("localSSINVStorage");
};

export const initDB = async () => {
  const db = await openDB();

  // await db.execAsync(`DROP TABLE products;`);

  await db.execAsync(`
        PRAGMA journal_mode = WAL;

        
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category VARCHAR(50) NOT NULL,
            name VARCHAR(150) NOT NULL,
            barcode VARCHAR(50) ,
            image_url TEXT,
            cost_price NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (cost_price >=0),
            selling_price NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (selling_price >=0),
            quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >=0),
            low_stock_threshold INTEGER NOT NULL DEFAULT 10,
            status VARCHAR(20) GENERATED ALWAYS AS (
            CASE
                WHEN quantity = 0 THEN 'Out of stock'
                WHEN quantity <= low_stock_threshold THEN 'Low stock'
                ELSE 'in_stock'
            END
            ) STORED,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
        );
        `);
};
