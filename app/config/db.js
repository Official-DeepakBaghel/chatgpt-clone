import mysql from "mysql2/promise";

// export async function getConnection() {
//     return await mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: "test",
//     });
// }

export const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "chatgpt_clone"
});

// Connection check removed to avoid top-level await blocking module loading
// The pool will handle connections automatically when queries are executed