const dbConfig = require('../config/db.config.js');

// 老馆 DB 目池记 钱
const pool = require('mysql2').createPool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.db,
	waitForConnections : dbConfig.waitForConnections,
	connectionLimit : dbConfig.connectionLimit
});

// 飘罚黎记侩 DB 目池记 钱
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