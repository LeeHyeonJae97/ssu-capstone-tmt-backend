const sql = require("./db.js").pool;
const sql2 = require("./db.js").pool2;

// constructor
const User = function(user) {
	this.name = user.name;
	this.email = user.email;
	this.phone_number = user.phone_number;
	this.age = user.age;
	this.height = user.height;
	this.weight = user.weight;
};

User.findByName = (uName, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("select * from users where name = ?", uName, (err, res) => {
				conn.release();

				if(err) {
					console.log(err);
					result(err, null);
				}

				else {
					if(res.length) result(null, res[0]);

					else result(new Error("No AffectedRows"), null);
				}
			})
		}
	});
};

User.create = async (newUser, id, pw, result) => {
	try {		
		const conn = await sql2.getConnection(async conn => conn);

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
}

User.update = (uID, updated, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("UPDATE users SET ? where uID = ?", [updated, uID], (err, res) => {
				conn.release()

				if(err) {
					console.log(err);
					result(err);
				}
				else if(res.affectedRows > 0) result(null)					
					
				else result(new Error("No AffectedRows"));								
			});
		}
	});
};

User.remove = (uID, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("delete from users where uID = ?", uID, (err, res) => {
				conn.release();

				if(err) {
					console.log(err);
					result(err);
				}

				else {
					if(res.affectedRows > 0) result(null);
					
					else result(new Error("No AffectedRows"));
				}
			});
		}
	});
};

module.exports = User;