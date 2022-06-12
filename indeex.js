const fs = require('fs');
const express = require('express');
const app = express();
const puerto = 8080;

class Contenedor {

    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        async function exe() {
            await fs.promises.readFile(`./${nombreArchivo}`, 'utf-8')
                .then(async (data) => {
                    if(data.length === 0){
                        console.log('el archivo estaba vacio, se ha reseteado a un arr vacio')
                        await fs.promises.writeFile(`./${nombreArchivo}`, '[]')
                    }
                })
                .catch(async (err) => {
                    console.log('se ha creado el archivo')
                    await fs.promises.writeFile(`./${nombreArchivo}`, '[]')
                })
        }
        exe();
    }

    save(obj) {
        setTimeout(async () => {
            let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            archivo = JSON.parse(archivo);
            if (archivo.length === 0) {
                const nuevoObj = {
                    ...obj,
                    id: 1
                }
                archivo.push(nuevoObj)
                let data = JSON.stringify(archivo);
                await fs.promises.writeFile(`./${this.nombreArchivo}`, data);
                try {
                    console.log(`Se ha guardado el archivo, id: ${nuevoObj.id}`);
                } catch (error) {
                    console.log(` ocurrio un error ${error}`)
                }
            } else {
                const nuevoObj = {
                    ...obj,
                    id: archivo.length + 1
                }
                archivo.push(nuevoObj)
                let data = JSON.stringify(archivo);
                await fs.promises.writeFile(`./${this.nombreArchivo}`, data);
                try {
                    console.log(`Se ha guardado el archivo, id: ${nuevoObj.id}`);
                } catch (error) {
                    console.log(` ocurrio un error ${error}`)
                }
            }
        }), 1000
    };

    getById(id) {
        setTimeout(async () => {
            let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            archivo = JSON.parse(archivo);
            let obj = archivo.find(obj => obj.id === id)
            if (obj) {
                console.log(obj);
            } else {
                console.log(null)
            }
        }), 1000
    }


    async getAll() {
        let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
        archivo = JSON.parse(archivo);
        return archivo;
    }

    async deleteById(id) {
        let archivo = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8');
        archivo = JSON.parse(archivo);
        let newArr = archivo.findIndex(obj => obj.id == id);
        if(newArr === -1){
            console.log('no se ha encontrado el archivo')
        }else{
            archivo.splice(newArr, 1);
            archivo = JSON.stringify(archivo);
            await fs.promises.writeFile(`./${this.nombreArchivo}`, archivo);
            console.log('se ha borrado el archivo')
        }
    }

    async deleteAll() {
            console.log('se estan borrando los objetos')
            await fs.promises.writeFile(`./${this.nombreArchivo}`, '[]')
            console.log('archivo reseteado con exito')
        
    }
}

/*CREAR EL ARCHIVO */
const productos = new Contenedor('productos.txt'); 


/* ARRAY DE OBJ */
const arrProducts = [
    {
        nombre: 'producto1',
        precio: '400'
    },
    {
        nombre: 'producto2',
        precio: '500'
    },
    {
        nombre: 'producto3',
        precio: '600'
    },
    {
        nombre: 'producto4',
        precio: '560'
    },
    {
        nombre: 'producto5',
        precio: '310'
    },
    {
        nombre: 'producto6',
        precio: '75'
    }
]


app.get('/productos', async(req, res) => {
    const allProducts = await productos.getAll();
    if(allProducts.length === 0){
        res.send('no hay productos');
    }else{
        res.send(allProducts);
    }
})

app.get('/productosRandom', async(req, res) => {
    const prodRandom = await productos.getAll();
    if(prodRandom.length === 0){
        res.send('no hay productos');
    }else{
        const random = Math.floor(Math.random() * prodRandom.length);
        res.send(prodRandom[random]);
    }
})


app.listen(puerto, err => {
    if (err) {
        console.log(`Hubo un error al inciar el servidor : ${err}`)
    } else {
        console.log(`Servidor escuchando el puerto: ${puerto}`)
    }
})