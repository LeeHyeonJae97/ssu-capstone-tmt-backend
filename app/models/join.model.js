const sql = require("./db.js").pool2;

// 새로운 유저 추가
exports.create = async (newUser, id, pw, result) => {
	try {		
		const conn = await sql.getConnection(async conn => conn);

		try {
			await conn.beginTransaction();

			let res = await conn.query("insert into users SET ?", newUser);
			let uID = res[0].insertId;

			await conn.query("insert into login SET ?", {id: id, pw: pw, uID: uID});

			await conn.query("insert into alarms SET ?", {uID: uID});

			await conn.commit();
			result(null, {uID: uID});
		}
		catch(err) {
			await conn.rollback();
			result(err, null);
		}
		finally {
			conn.release();
		}
	}
	catch(err) {
		result(err, null);
	}
};

// 아이디 중복확인
exports.doublecheck = async (id, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			let res = await conn.query("select id from login where id = ?", id);
			if(res[0].length) throw new Error("id is double");

			else result(null);
		}
		catch(err) {
			result(err);
		}
		finally {
			conn.release();
		}
	}
	catch(err) {
		result(err);
	}
};