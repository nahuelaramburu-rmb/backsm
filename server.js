const express = require('express');
require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');
bodyParser = require('body-parser');
//const config = require('./config.js');


const app = express();
// Aplicar CORS 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());

// Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.post('/datos', (req, res) => {
    const {email,password} = req.body
    db.query('SELECT * FROM usuarios WHERE email = ? AND password = ?',[email, password], (err, results) => {
        if (err) {
            // no enmascara
            return res.status(500).json({ message: 'Hubo un error interno en el servidor. Por favor, intenta de nuevo más tarde.' });
        } else {
            if (results.length > 0) {
              res.json({ mensaje: 'Login exitoso' });
            } else {
              res.status(401).json({ mensaje: 'Credenciales incorrectas' });
            }
    }
})});


// Configurar servidor para escuchar en el puerto 8081
app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
