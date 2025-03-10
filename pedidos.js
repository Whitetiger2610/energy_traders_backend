// const {Pool} = require('pg')
// const bcrypt = require('bcryptjs')

// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     password: 'postgres',
//     database: 'energy_traders',
//     port: 5433,
//     allowExitOnIdle: true
// })

const pool= require('./config/db')

const agregarPedido = async (pedido) =>{

    let {total, cantidad, usuario_id} = pedido;

    if (!usuario_id) {
        console.log('Error: usuario_id es null o undefined');
        throw { code: 400, message: "Usuario no encontrado en el pedido" };
    }
   
    const values = [total,cantidad,usuario_id]
    const consulta = "INSERT INTO pedidos(total,cantidad,usuario_id) values ($1,$2,$3)"
    await pool.query(consulta,values)
    console.log("Pedido agregado por usuario ID: ", usuario_id)

}

// const agregarPedidosProductos = async (pedidos) =>{

//         let {pedido_id, producto_id} = pedidos
    
//         const values1 = [total,cantidad]
//         const consulta1 = "INSERT INTO productos values (DEFAULT,$1,$2)"
//         await pool.query(consulta,values)
//         console.log("Producto agregado por usuario ID: ", usuario_id)

module.exports = {agregarPedido}