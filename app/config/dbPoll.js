import mysql from "mysql2/promise";

// Prevent multiple pools in dev (hot reload fix)
let pool;

if (!global.mysqlPool) {
    global.mysqlPool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'chatgpt_clone',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

pool = global.mysqlPool;

export { pool };
