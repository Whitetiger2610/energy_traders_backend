const {Pool} = require('pg')
const bcrypt = require('bcryptjs')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'energy_traders',
    port: 5433,
    allowExitOnIdle: true
})

const verificarCredenciales = async (email, password) => {
   
    const values = [email]
    const consulta = "SELECT * FROM usuarios WHERE email = $1"
    const {rows: [usuario], rowCount} = await pool.query(consulta,values)

    const {password: passwordEncriptada} = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)

    if (!passwordEsCorrecta || !rowCount)
        throw {code:401, message: "Email o contraseña incorrecta"}
}


const registrarUsuario = async (usuario) =>{
    let {rol, nombre, apellido, email, password} = usuario
    console.log(usuario)
    const passwordEncriptada = bcrypt.hashSync(password)
    password = passwordEncriptada
    const values = [rol, nombre, apellido, email, passwordEncriptada]
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4, $5)"
    await pool.query(consulta, values)
}

const getUsuario = async (email) => {
    const consulta = "SELECT rol, nombre, apellido, email FROM usuarios WHERE email = $1";
    const { rows } = await pool.query(consulta, [email]);
  if (rows.length === 0) {
    throw { code: 404, message: "Usuario no encontrado" };
  }

  return rows[0];
};

module.exports = {verificarCredenciales, registrarUsuario, getUsuario}