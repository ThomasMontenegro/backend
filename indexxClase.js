/*const http = require("http")

const server = http.createServer((req,res) => {
    res.end ('bienvenido a nuestro servicio http')
})

server.listen(8080,()=>{
     console.log("servidor escuchando el puerto 8080")
})*/

const express = require('express')
const app = express()
const puerto= 8080

app.listen(puerto, ()=>{
    console.log( `el servidor escucha el ${puerto}`)
})
app.get("/productos", (req,res)=>{
    res.send("hola soy productos get")
})
app.post("/productos", (req,res)=>{
    res.send("hola soy productos post")
})