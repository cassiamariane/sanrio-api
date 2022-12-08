const express = require('express')
const app = express()
const cors = require('cors');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'sanrio'
});
 
connection.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.get('/sanrio', (req, res) => {
    connection.query('SELECT * FROM personagens', function (error, results) {
        if (error) 
        throw error;
        res.json(results)
    })
})

app.put(`/sanrio/:id/:contador`, (req, res) => {
    const id = req.params.id
    const curtidas = req.params.contador
    connection.query(`UPDATE personagens SET curtidas = ${curtidas} WHERE id = ${id};`, function (error, results) {
        if (error) 
        throw error;
        res.json(results)
    })
})

app.get('/sanrio/curtidas', (req, res) => {
    connection.query('SELECT nome, curtidas FROM `sanrio`.`personagens`;', function (error, results) {
        if (error) 
        throw error;
        res.json(results)
    })
})

app.listen(8080, ()=> {
    console.log('servidor rodando');
})
