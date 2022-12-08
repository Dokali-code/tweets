const express = require("express");
const engine = require("express-handlebars").engine;
const app = express();
var mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tweets",
});

connection.connect();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.get("/", (req, res) => {
  var { nom_auteur, texte_statut, temps_pub } = req.body;
  connection.query(
    "SELECT * from tweet WHERE nom_auteur = ?, texte_statut=  ?, temps_pub = ?",
    [nom_auteur, texte_statut, temps_pub],
    function (error, rows) {
      if (error) throw error;
      res.render("home", { rows });
    }
  );
});

app.listen(3000);
