const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123123",
    database: "dbitens",
})
//CREATE LISTA PETNAMES
app.post("/item", (req, res) => {
    const { item } = req.body;
    let SQL = "INSERT INTO petnames (itens) VALUES (?)";
    db.query(SQL, item, (err, result) => {
        console.log(err);
    });
});
//READ LISTA PET NAMES
app.get("/itens", (req, res) => {

    let SQL = "SELECT * from petnames";
    db.query(SQL, (err, result) => {
        if(err) console.log(err);
        else res.send(result);
    })

})
//DELETE LISTA PET NAMES
app.delete("/item/:id", (req, res) => {

    const { id } = req.params;
    console.log("informação: ", id)

    let SQL = "DELETE FROM petnames WHERE ('id' = ?)";

    db.query(SQL, id, (err, result) =>{
        console.log(err);
    })

})

/*app.get("/", (req, res) => {
    let SQL = "INSERT INTO petnames (itens) VALUES ('teste')";

    db.query(SQL, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Erro ao inserir dados na tabela." });
        }

        return res.status(200).json({ message: "Dados inseridos com sucesso." });
    });
});*/


app.listen(3001, () => {
    console.log("Servidor em estado operacional!");
});


