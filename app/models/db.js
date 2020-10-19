const dbConfig = require('../config/db.config.js');

// Create a connection pool to the database
const pool = require('mysql2').createPool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.db,
	waitForConnections : dbConfig.waitForConnections,
	connectionLimit : dbConfig.connectionLimit
});

const pool2 = require('mysql2/promise').createPool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.db,
	waitForConnections : dbConfig.waitForConnections,
	connectionLimit : dbConfig.connectionLimit
});

module.exports = {
pool: pool,
pool2: pool2
}