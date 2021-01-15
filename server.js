require('dotenv').config(); // --> lee las variables de entorno del archivo .env y las
                            // incorpora a process.env.PORT
const path       = require('path');
const cors       = require('cors');
const express    = require('express');
const mongoose   = require('mongoose'); // Es un paquete
const apiRoutes  = require('./routes'); // Es un archivo

const app    = express();
const PORT   = process.env.PORT || 3000; // "process" es un objeto que contiene información acerca
                                         // de la aplicación. No es necesario importarlo, pero se
                                         // podría. Contiene muchas propiedades y métodos.
const DB_URI = process.env.DB_URI;

// CONEXIÓN A BASE DE DATOS
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("Conexión a BD correcta"))
    .catch(error => console.log("Error al conectarse a la BD" + error));


// MIDDLEWARE
app.use(cors());            // Soporte para CORS
app.use(express.json());    // IMPORTANTE: Poner esto antes de las rutas
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname , 'public')));

// SERVIDOR WEB
app.listen(PORT, () => console.log("Servidor iniciado..."));
