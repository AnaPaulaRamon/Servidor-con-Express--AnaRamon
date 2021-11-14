const fs = require('fs');

class Contenedor{
    constructor(path) {
        this.archivo = path;
      }

    async save(obj) {
        try{
            let data = await fs.promises.readFile(this.archivo, 'utf-8');
            let dataObj = JSON.parse(data);

            if(dataObj.some(data=>data.title===obj.title)){//Si existe un objeto con el mismo nombre
                return {status:"error",message:"El objeto ya existe"}
            }else{
                let objNew = {
                    title: obj.title,
                    price: obj.price,
                    thumbnail: obj.thumbnail,
                    id: dataObj.length + 1
                };
                dataObj.push(objNew);
                try{
                    await fs.promises.writeFile(this.archivo, JSON.stringify(dataObj, null, 2));
                    return {status: "success", message: "El objeto se añadio con exito", id: objNew.id}
                } catch(err) {
                    return {status: "error", message: "No se pudo añadir el objeto: ", err};
                }
            }
            
        } catch(err){
            let objNew = {
                title: obj.title,
                price: obj.price,
                thumbnail: obj.thumbnail,
                id: 1
            };
            try{
                await fs.promises.writeFile(this.archivo, JSON.stringify([objNew], null, 2));
                return {status:"success", message: "El objeto se añadio con exito", id: objNew.id};
            } catch(err) {
                return {status: "error", message: "No se pudo añadir el objeto a carpeta inexistente: ", err}
            }
    }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.archivo, 'utf-8');
            let dataObj = JSON.parse(data);
            let elemento = dataObj.find(e=>e.id===id);
            if(elemento){
                return {status:"success", obj: elemento}
            }else{
                return {status:"error", event:null, message:"Objeto no encontrado"}
            }
        } catch(err) {
            return {status: "error", message: 'No se encontro el objeto'};
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.archivo, 'utf-8');
            let dataObj = JSON.parse(data);
            return {status:"success", data: dataObj}
        } catch(err) {
            return {status: "error", message: 'La carpeta esta vacia'};
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(this.archivo, 'utf-8');
            let dataObj = JSON.parse(data);
            let elemento = dataObj.find(e=>e.id===id);
            if(elemento){
                try{
                    const isElementId = el => el.id===id;
                    const indexElement = dataObj.findIndex(isElementId);
                    dataObj.splice(indexElement,1);
                    await fs.promises.writeFile(this.archivo, JSON.stringify(dataObj, null, 2));
                    return {status: "success", message:"El objeto fue borrado exitosamente"};
                } catch(err) {
                    return {status: "error", message: "No se pudo borrar el objeto" + err}
                }
            }else{
                return {status:"error", event:null, message:"Objeto no encontrado"}
            }
        } catch(err) {
            return {status: "error", message: 'No hay objetos en el archivo'};
        }
    }

    async deleteAll() {
        try {
            const emptyVar = '';
            await fs.promises.writeFile(this.archivo, emptyVar);
            return {status: "success", message: "Los objetos fueron borrados exitosamente"};
        } catch(err) {
            return {status: "error", message: 'No se pudo borrar los objetos'};
        }
    }
}

module.exports = Contenedor;