const db = require('mysql2')
const env = require('dotenv').config(); 

if (env.error) {
    throw new Error("Error al cargar las variables de entorno:", env.error);
}

module.exports = () => {
    return db.createConnection({
        host: env.parsed.DB_HOST,
        user: env.parsed.DB_USR,
        password: env.parsed.DB_PASSWORD,
        database: env.parsed.DB_NAME
    })
}
