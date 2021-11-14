const express = require('express');
const Contenedor = require('./classes/Contenedor');


const app = express();
const PORT = process.env.PORT || 8080;
const productos = new Contenedor('./files/productos.txt');

const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en: ', PORT);
});

server.on("error", (error) => console.log("Error en el servidor: ", error));

app.get('/', (req,res) => {
    res.send('Hola mundo');
});

app.get('/productos', (req,res) => {
    productos.getAll().then(result => {
        res.send(result.data);
    })
});

app.get('/productoRandom', async (req,res) => {
    let allProducts = await productos.getAll();
    let totalProd = allProducts.data.length;
    let randNum = Math.floor((Math.random()) * (totalProd-1+1) + 1);
    productos.getById(randNum).then(result => {
        res.send(result.obj);
    })
});