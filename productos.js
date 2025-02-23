const {Pool} = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'energy_traders',
    port: 5433,
    allowExitOnIdle: true
})

const obtenerProductos = async() =>{
    const {rows} = await pool.query("SELECT * FROM productos")
    return rows
}

const listarProductos = async (id)=>{
    const consulta = `SELECT * from VIAJES where id = $1 `
    const result = await pool.query(consulta, [id])
}

const agregarProducto = async (codigo, nombre, marca, precio, stock, img1, img2, descripcion) =>{
    const consulta = "INSERT INTO productos values (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8)"
    const values = [codigo, nombre, marca, precio, stock, img1, img2, descripcion]
    const result = await pool.query(consulta,values)
    console.log("Producto agregado")
}

const actualizarProducto = async (codigo, nombre, marca, precio, stock, img1, img2, descripcion,id) =>{
    const consulta = "UPDATE productos SET codigo = $1, nombre = $2, marca = $3, precio = $4, stock = $5, imagen1 = $6, imagen2 = $7, descripcion = $8 WHERE id = $9"
    const values = [codigo, nombre, marca, precio, stock, img1, img2, descripcion,id]
    const {rowCount} = await pool.query(consulta,values) 
    if (rowCount === 0){
        throw {code:404, message: "No se consiguió ningún producto con este id"}
    }
}

const eliminarProducto = async(id) =>{
    const consulta = "DELETE FROM productos WHERE id = $1"
    const values = [id]
    const { rowCount } = await pool.query(consulta, values)
    if (!rowCount) throw { code: 404, message: "No se encontró ningún evento con este ID" }
}

const obtenerProducto = async (id)=>{
    const consulta = `SELECT * from productos where id = $1`
    const values = [id]
    const result = await pool.query(consulta, values)
    const [producto] =result.rows
    return producto
}

module.exports = {obtenerProductos, listarProductos, agregarProducto, actualizarProducto,eliminarProducto, obtenerProducto }