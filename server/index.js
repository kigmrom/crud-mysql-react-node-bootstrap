const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "",
   database: "empleados_crud"
});

app.post("/create", (req, res) => {
   const nombre = req.body.nombre;
   const edad = req.body.edad;
   const pais = req.body.pais;
   const cargo = req.body.cargo;
   const anhos = req.body.anhos;

   db.query('INSERT INTO empleados(nombre, edad, pais, cargo, anhos) VALUES (?, ?, ?, ?, ?)', [nombre, edad, pais, cargo, anhos],
      (err, result) => {
         if (err) {
            console.log(err);
         }
         else {
            res.send("Empleado registrado con éxito!!");
         }
      }
   );
});

app.put("/update", (req, res) => {
   const id = req.body.id;
   const nombre = req.body.nombre;
   const edad = req.body.edad;
   const pais = req.body.pais;
   const cargo = req.body.cargo;
   const anhos = req.body.anhos;

   db.query('UPDATE empleados SET nombre=?, edad=?, pais=?, cargo=?, anhos=? WHERE id=?', [nombre, edad, pais, cargo, anhos, id],
      (err, result) => {
         if (err) {
            console.log(err);
         }
         else {
            res.send(result);
         }
      }
   );
});

app.delete("/delete/:id", (req, res) => {
   const id = req.params.id;

   db.query('DELETE FROM empleados WHERE id=?', [id],
      (err, result) => {
         if (err) {
            console.log(err);
         }
         else {
            res.send(result);
         }
      }
   );
});

app.get("/empleados", (req, res) => {
   db.query('SELECT * FROM empleados', (err, result) => {
      if (err) {
         console.log(err);
      }
      else {
         res.send(result);
      }
   }
   );
});

app.listen(3001, () => {
   console.log("Corriendo en el puerto 3001")
});