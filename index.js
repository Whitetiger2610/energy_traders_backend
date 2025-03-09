const { verificarCredenciales, registrarUsuario, getUsuario, getUsuarioId } = require("./consultas")
const { actualizarProducto, agregarProducto, obtenerProductos, eliminarProducto, obtenerProducto } = require('./productos');
const {agregarPedido} = require('./pedidos')

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
        const {email,password, rol} = req.body
        await verificarCredenciales(email, password,rol)
        const token = jwt.sign({email}, SECRET_KEY, {expiresIn:"30d"})
        res.json({token})
        console.log("Token generado:", token);
    } catch (error){
        console.log("Error en login:", error);
        res.status(error.code || 500).json({ error: error.message });
    }})
    
app.post("/registro", async (req, res) =>{
    try {
        const usuario = req.body
        console.log("Registrando usuarios:",usuario)
        await registrarUsuario (usuario)
        const token = jwt.sign({ email: usuario.email }, SECRET_KEY, { expiresIn: "30d" });
        res.json({
            message: "Usuario creado con éxito",
            token,
            usuario: {
                rol: usuario.rol,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                nit: usuario.nit,
                email: usuario.email,
            }
        });
        } catch (error){
            console.log("Error en registro:", error);
            res.status(500).json({ error: error.message });
        }
})

app.get("/perfil", async (req, res) => {
    try {
        const Authorization = req.header("Authorization")
        if (!Authorization){
            return res.status(400).json({error:"Token no proporcionado"})
        }
        if(!Authorization.startsWith("Bearer ")) {
            return res.status(400).json({error:"Token no proporcionado o mal formado"})
        }
        const token = Authorization.split(" ")[1]

        const decoded = jwt.verify(token,SECRET_KEY)

        if (!decoded.email) {
            return res.status(400).json({error:"Token inválido o faltan datos en el payload"});
          }
        const usuario = await getUsuario(decoded.email)
        if (!usuario) {
            throw { code: 404, message: "Usuario no encontrado" };
        }
        console.log("Usuario encontrado:", usuario);
        res.json(usuario)
    } catch (error) {
        console.error("Error en /perfil:", error);
        res.status(error.code || 500).json({ error: error.message }); 
    }
})

//Endpoints Productos

app.get("/productos", async(req,res) =>{
    const productos = await obtenerProductos()
    res.json(productos)
})

app.post("/productos", async(req,res) =>{
   try {
        const producto = req.body
        const Authorization = req.header("Authorization")

        if (!Authorization || !Authorization.startsWith("Bearer ")) {
            return res.status(400).json({ error: "Token no proporcionado o mal formado" });
        }

        const token = Authorization.split(" ")[1]
        const decode = jwt.verify(token,SECRET_KEY)
        const { email } = decode

        const usuario_id = await getUsuarioId(email)
        producto.usuario = email

        await agregarProducto(producto)
        res.json({
            message: "Producto creado con éxito",
            token,
            producto: {
                codigo: producto.codigo,
                nombre: producto.nombre,
                marca: producto.marca,
                precio: producto.precio,
                stock: producto.stock,
                imagen1: producto.imagen1,
                imagen2: producto.imagen2,
                descripcion: producto.descripcion,
                usuario_id:usuario_id
            }
        });
    } catch (error){
        console.log("Error en registro:", error);
        res.status(500).json({ error: error.message });
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

//Endpoints Pedidos

app.post("/pedidos", async(req,res) =>{
    try {
         const pedido = req.body
         const Authorization = req.header("Authorization")
 
         if (!Authorization || !Authorization.startsWith("Bearer ")) {
             return res.status(400).json({ error: "Token no proporcionado o mal formado" });
         }
 
         const token = Authorization.split(" ")[1]
         console.log(token)
         const decode = jwt.verify(token,SECRET_KEY)
         const { email } = decode
 
         const usuario_id = await getUsuarioId(email)
         pedido.usuario = email
 
         await agregarPedido(pedido)
         res.json({
             message: "Pedido creado con éxito",
             token,
             pedido: {
                 total: pedido.total,
                 cantidad: pedido.cantidad,
                 usuario_id:usuario_id
             }
         });
     } catch (error){
         console.log("Error en registro:", error);
         res.status(500).json({ error: error.message });
     }
 })

module.exports = server