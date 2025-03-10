const pool= require('./config/db')
const bcrypt = require('bcryptjs')


const verificarCredenciales = async (email, password,rol) => {
   
    const values = [email,rol]
    const consulta = "SELECT * FROM usuarios WHERE email = $1 AND rol = $2"
    const {rows: [usuario], rowCount} = await pool.query(consulta,values)

    if (!usuario || rowCount === 0) {
      throw { code: 401, message: "Email,rol o contraseña incorrecta" };
    }

    const {password: passwordEncriptada} = usuario
    const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada)

    if (!passwordEsCorrecta || !rowCount)
        throw {code:401, message: "Email o contraseña incorrecta"}


}


const registrarUsuario = async (usuario) =>{
    let {rol, nombre, apellido, nit, email, password} = usuario
    
    const emailExistente = await pool.query("SELECT email FROM usuarios WHERE email = $1", [email]);

    if (emailExistente.rows.length > 0) {
        throw { code: 400, message: "El email ya está registrado con otro usuario" };
    }
    const passwordEncriptada = bcrypt.hashSync(password,10)
    
    const values = [rol, nombre, apellido, nit, email, passwordEncriptada]
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4, $5, $6)"
    await pool.query(consulta, values)
}

const getUsuario = async (email) => {
    const consulta = "SELECT id,rol, nombre, apellido, nit, email FROM usuarios WHERE email = $1";
    const values = [email]
    const result = await pool.query(consulta,values);
  
    
  if (result.rows.length === 0) {
    throw { code: 404, message: "Usuario no encontrado" };
  }
  const usuario = result.rows[0]
  console.log("Datos del usuario: ", usuario)
  return usuario;
};

const getUsuarioId = async (email) => {
  const consulta = "SELECT id FROM usuarios WHERE email = $1";
  const values = [email];

  const { rows } = await pool.query(consulta, values);
  if (rows.length === 0) {
      throw { code: 404, message: "Usuario no encontrado" };
  }

  return rows[0].id;
};

module.exports = {verificarCredenciales, registrarUsuario, getUsuario, getUsuarioId}