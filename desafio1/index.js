mascotas= []
libros= []

class Usuario {
    constructor (nombre, apellido, libros, mascotas){
        this.nombre= nombre;
        this.apellido = apellido;
        this.libros= libros;
        this.mascotas= mascotas;
    }
    
 getFullName(){
    return `${this.nombre} ${this.apellido} `
}
 addMascota(mascota){
    this.mascotas.push(mascota)
 }
 countMascota(){
     let cantidadMascotas = this.mascotas.length
      return cantidadMascotas;
 }
 addBook(nombre, autor){
     libros.push({nombre , autor})
 }
 getBookNames(){
     return this.libros.map (titulo=> titulo.nombre)
 }
}

const persona = new Usuario("Thomas", "Montenegro", libros, mascotas);

persona.addMascota("Fidel")
persona.addMascota("Kimba")
persona.addMascota("Chachi")
persona.addMascota("Nilo")


persona.addBook("Buscando a Alaska", "John Green")
persona.addBook("El señor de los anillos", "J.R.R Tolkien")


    console.log ( persona.getFullName())
    console.log(persona.mascotas)
    console.log (persona.countMascota())
    console.log(persona.getBookNames())
