import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql from "mysql";

dotenv.config();
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//default route
// app.get("/", (req, res) => {
//   try {
//     res.send("Backend is running....YAY");
//   } catch (err) {
//     console.log("OH NO .... ERROR");
//   }
//   return true;
// });

//get all records
app.get("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    // console.log("connected as id + ", connection.threadId);
    connection.query("SELECT student_name FROM student", (err, rows) => {
      connection.release();
      if (!err) res.send(rows);
      else console.log(err);

      // console.log("the data from student table are as follows:/n", rows);
    });
  });
});

//get specific record
app.get("/:id", (req, res) => {
  pool.getConnection((err, connection1) => {
    if (err) throw err;
    connection1.query(
      "select * from student where id = ?",
      [req.params.id],
      (err, rows) => {
        connection1.release();
        if (!err) res.send(rows);
        else console.log(err);
      }
    );
  });
});

//delete a record
app.delete("/delete/:id", (req, res) => {
  pool.getConnection((err, con) => {
    if (err) throw err;
    // console.log(req.params)
    con.query(
      "delete from student where id = ?",
      [req.params.id],
      (err, row) => {
        if (!err) res.send(row);
        else console.log(err);
      }
    );
  });
});

//create a record
app.post("/add", (req, res) => {
  const params = req.body;
  pool.getConnection((err, con) => {
    if (err) throw err;
    // console.log(req)
    con.query(
      "insert into student set ?",
      params,
      (err, row) => {
        con.release();
        if (!err) res.send(row);
        else console.log(err);
      }
    );
  });
});

//update a record 
app.put("/update", (req, res)=>{
  pool.getConnection((err,con)=>{
    if(err) throw err;

    const updatedData = req.body
    con.query("update student set student_name = ?, student_roll = ?, student_address = ?", updatedData,(err,row)=>{
      con.release();
      if(!err) res.send(row);
      else console.log(err)
    })
  })
})
// MongoDB Connection

//MYSQL connection

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "vinayak_db",
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
