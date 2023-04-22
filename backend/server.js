import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from 'multer';
import bodyParser from "body-parser";


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	 host: "web-db.czwhh69hr7aj.ap-southeast-2.rds.amazonaws.com",
	  user: "admin",
	  password: "abcd1234",
	  database: "books",
});


app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`,`author`,`description`,`price`) VALUES (?)";
  
  const values = [
    req.body.title,
    req.body.author,
    req.body.desc,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `author`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.author,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8801, () => {
  console.log("Connected to backend.");
});

