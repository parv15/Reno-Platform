import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: Number(process.env.MYSQL_PORT) || 3306,
});

(async () => {
  try {
    const conn = await db.getConnection();
    console.log("Connected to MySQL database");
    conn.release();
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
})();