const dbConfig = require('../config/db.config.js');

// �Ϲ� DB Ŀ�ؼ� Ǯ
const pool = require('mysql2').createPool({
	host: dbConfig.host,
	user: dbConfig.user,
	password: dbConfig.password,
	database: dbConfig.db,
	waitForConnections : dbConfig.waitForConnections,
	connectionLimit : dbConfig.connectionLimit
});

// Ʈ����ǿ� DB Ŀ�ؼ� Ǯ
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