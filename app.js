const Contenedor = require('./classes/Contenedor');

const data = new Contenedor('./files/productos.txt');

data.save({
    title: 'Vela Azul',
    price: 15,
    thumbnail: 'https://www.bathandbodyworks.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master-catalog/default/dw8838525d/hires/026291234.jpg?sh=471'})
    .then(result => {
        console.log(result.id);
    });

data.save({
    title: 'Vela Verde',
    price: 14,
    thumbnail: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1628616377-026307520.jpg'})
    .then(result => {
    console.log(result.id);
});

data.save({
    title: 'Vela Blanca',
    price: 20,
    thumbnail: 'https://www.bathandbodyworks.com/dw/image/v2/BBDL_PRD/on/demandware.static/-/Sites-master-catalog/default/dw8f30190c/crop/026309138_crop.jpg?sw=500&sh=600&sm=fit&q=75'})
    .then(result => {
    console.log(result.id);
});