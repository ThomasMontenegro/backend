const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  /* SAVE */

  async save(objeto) {
    
    let data = await fs.promises.readFile(`./${this.archivo}`, 'utf-8')

        if(!data) {
            let id = JSON.parse(await fs.promises.readFile("./id.txt", "utf-8"));
            let maxID = Math.max(...id);
            objeto.id = maxID + 1;
            id = [...id, objeto.id];
            await fs.promises.writeFile(`./id.txt`, JSON.stringify(id));
            
            await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(objeto))}

            else {

    // Obteniendo ID
    let id = JSON.parse(await fs.promises.readFile("./id.txt", "utf-8"));
    let maxID = Math.max(...id);
    objeto.id = maxID + 1;
    id = [...id, objeto.id];
    await fs.promises.writeFile(`./id.txt`, JSON.stringify(id));

    //Obteniendo productos
    let productos = JSON.parse(
      await fs.promises.readFile("./products.txt", "utf-8")
    );

    //Agrego producto
    productos.push(objeto);

    await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(productos));

    console.log("Producto agregado con el ID ", objeto.id);
  }}

  /* GET BY ID */

  async getById(id) {
    let productos = JSON.parse(
      await fs.promises.readFile("./products.txt", "utf-8")
    );

    let objeto = productos.find((prod) => prod.id == id);

    console.log(objeto ? objeto : "ese ID no existe");
  }



  /* GET ALL */

  async getAll() {
    let productos = JSON.parse(
      await fs.promises.readFile("./products.txt", "utf-8")
    );
    console.log(productos);
  }

  /* DELETE BY ID */

  async deleteById(id) {
    let productos = JSON.parse(
      await fs.promises.readFile("./products.txt", "utf-8")
    );

    if (productos.some((prod) => prod.id == id)) {
      let newProductos = productos.filter((prod) => prod.id != id);

      await fs.promises.writeFile(
        `./${this.archivo}`,
        JSON.stringify(newProductos)
      );
      console.log("producto eliminado");
    } else {
      console.log("no existe producto con ese id");
    }
  }

  /*DELETE ALL */

  async deleteAll() {
    
    try {
    
    await fs.promises.writeFile(`./${this.archivo}`, "[]");

    console.log("Todos los archivos han sido eliminados");
    }catch(error) {
        console.log(error)
    }
  }
}

new Contenedor('products.txt').save({nombre: 'pelota', precio: 320, thumbnail: 'ejemplo url'})

new Contenedor('products.txt').getById(8)

new Contenedor('products.txt').getAll()

new Contenedor('products.txt').deleteById(6)

new Contenedor('products.txt').deleteAll()