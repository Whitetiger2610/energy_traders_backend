const { verificarCredenciales, registrarUsuario, getUsuario } = require("./consultas")
const { actualizarProducto, agregarProducto, obtenerProductos, eliminarProducto, obtenerProducto } = require('./productos');

const jwt = require("jsonwebtoken")
const express = require('express')
const cors = require('cors')
const app = express()

const PORT = 3000;
const SECRET_KEY = "az-AZ";

const server = app.listen(PORT,()=> console.log("Servidor Encendido"));

app.use(cors());
app.use(express.json())

//Endpoints Usuarios

app.post("/login", async (req,res)=>{
    try {
        const {email,password} = req.body
        await verificarCredenciales(email, password)
        const token = jwt.sign({email}, SECRET_KEY, {expiresIn:"30d"})
        res.json(token)
        console.log(token)
    } catch (error){
        console.log(error)
        res.status(error.code || 500).send(error)
    }})
    
app.post("/usuarios", async (req, res) =>{
    try {
        const usuario = req.body
        console.log(usuario)
        await registrarUsuario (usuario)
        res.send ("Usuario creado con éxito")
        } catch (error){
        res.status(500).send(error)
        }
})

app.get("/usuarios", async (req, res) => {
    try {
        const Authorization = req.header("Authorization")
        if (!Authorization || !Authorization.startsWith("Bearer ")) {
            return res.status(400).send("Token no proporcionado o mal formado")
        }
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token,"az_AZ")
        const {email} = jwt.decode(token)
        
        if (!email) {
            throw { code: 400, message: "Token inválido o faltan datos en el payload" };
          }
        const usuario = await getUsuario(email)
        if (!usuario) {
            throw { code: 404, message: "Usuario no encontrado" };
        }
        console.log("Usuario encontrado:", usuario);
        res.json([usuario])
    } catch (error) {
        console.error("Error en /usuarios:", error);
        res.status(error.code || 500).send(error.message || error);   
    }
})

//Endpoints Productos

app.get("/productos", async(req,res) =>{
    const productos = await obtenerProductos()
    res.json(productos)
})

app.post("/productos", async(req,res) =>{
   try {
        const {codigo, nombre, marca, precio, stock, imagen1, imagen2, descripcion} = req.body
        const Authorization = req.header("Authorization")
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token,SECRET_KEY)
        const { email } = jwt.decode(token)
    await agregarProducto(codigo, nombre, marca, precio, stock, imagen1, imagen2, descripcion)
    res.send(`Producto agregado exitosamente por el usuario ${email}`)
    } catch (error){
        const {code} = error
        if(code == "23502")
            res.status(400)
            .send("Se ha violado la restriccion NOT NULL en uno de los campos de la tabla")
        res.status(500).send(error)
    }
})

app.put("/productos/:id", async(req,res)=>{
    try{
        const { id } = req.params
        const {codigo, nombre, marca, precio, stock, imagen1, imagen2, descripcion} = req.body
        const Authorization = req.header("Authorization")
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token,SECRET_KEY)
        const { email } = jwt.decode(token)
        await actualizarProducto(codigo, nombre, marca, precio, stock, imagen1, imagen2, descripcion,id)
        res.send(`El producto de id ${id} fue modificado por ${email}`)
        console.log(token)
    } catch (error){
        res.status(error.code || 500).send(error)
    }
})


app.delete("/productos/:id", async(req,res)=>{
    try{
        const { id } = req.params
        const Authorization = req.header("Authorization")
        const token = Authorization.split("Bearer ")[1]
        jwt.verify(token,SECRET_KEY)
        const { email } = jwt.decode(token)
        await eliminarProducto(id)
        res.send(`El usuario ${email} ha eliminado el producto de id ${id}`)
    } catch (error){
        res.status(error.code || 500).send(error)
    }
})

const reportarConsulta = async(req,res,next) =>{
    const parametros = req.params
    const url = req.url
    console.log(`
    Hoy ${new Date()}
    Se ha recibido una consulta en la ruta ${url}
    con los parametros:
    `, parametros)
    next()
}

app.get("/productos/:id", reportarConsulta, async(req,res) =>{
    const{id} = req.params 
    const producto = await obtenerProducto(id)
    res.json(producto)
})

module.exports = server