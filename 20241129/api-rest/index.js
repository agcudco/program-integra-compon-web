import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2'
import cors from 'cors'

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

//crear el puerto de escucha
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

///get=> es para traer información
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API');
});


const bd = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        port: 3306,
        database: 'bd-pic'
    }
);

bd.connect(error => {
    if (!error) {
        console.log('Conexión exitosa a la BD');
    } else {
        console.log('Error al establecer la conexión a la BD');
        return;
    }
});

///obtener todos los libros

//api/v1/libros/
app.get("/libros/", (req, res) => {
    const consulta = 'SELECT * FROM libros';
    bd.query(consulta, (error, results) => {
        if (error) {
            res.status(500).send(`Error al rescibir datos: ${error}`);
            return;
        }
        res.status(200).json(results);
        console.log("Se obtuvieron: " + results.length + " libro(s)");
    });
});

app.post(/libros/, (req, res) => {
    const { titulo, autor, editorial, nro_paginas, stock, estado } = req.body;
    const query = 'INSERT INTO libros(titulo,autor,editorial,nro_paginas,stock,estado) VALUES (?,?,?,?,?,?)'
    bd.query(query,
        [titulo, autor, editorial, nro_paginas, stock, estado],
        (error,results) => {
            if(error){
                res.status(500).json(`Error al insertar ${error}`);
                return;
            }
            res.status(201).json(`Libro registrado con el ID: ${results.insertId}`);
            console.log(`Libro registrado con el ID: ${results.insertId}`)
        }
    );
});