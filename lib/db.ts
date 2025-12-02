import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "switchback.proxy.rlwy.net",
  user: "root",
  password: "gvifJYIEbxFVekpuZirdekimOFtABwfU",
  port: 35748,
  database: "railway",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
