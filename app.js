const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

/*
// you can create connection without .env file (which is used for hiding your info)
const connection = mysql.createConnection({
    host: localhost,                           
    user: root,                              
    password: process.env.PASSWORD,          // your mysql password
    database: firstdatabase,                // your database name
    port: 5000                              // any port you want from 3000 to 9000
});
*/

connection.connect((err) => {
  if (err) throw err;
  else console.log("Connected!");
});

app.post("/insert", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const birthday = req.body.birthday;

  const sql = `INSERT INTO users (username, password, birthday) 
              VALUES ("${username}","${password}","${birthday}")`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });
});

app.get("/username/:name", (req, res) => {
  let sql = "SELECT birthday FROM users WHERE username = ?";
  connection.query(sql, [req.params.name], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.patch("/update", (req, res) => {
  const sql = `UPDATE users 
                SET password = "${req.body.password}", birthday = "${req.body.birthday}" 
                WHERE username="${req.body.username}"`;
  connection.query(sql, (error, result) => {
    res.send({
      ok: true,
    });
  });
});

app.delete("/delete/:username", (req, res) => {
  let sql = "DELETE FROM users WHERE username = ?";
  connection.query(sql, [req.params.username], (err, result) => {
    if (err) throw err;
  });
});

app.get("/showAll", (req, res) => {
  let sql = "SELECT * FROM users";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
    console.log(result);
  });
});

app.listen(process.env.PORT, () => console.log("app is running"));
