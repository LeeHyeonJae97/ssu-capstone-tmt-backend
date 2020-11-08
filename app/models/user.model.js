const sql = require("./db.js").pool;

exports.findByName = (uName, result) => {
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

exports.update = (uID, updated, result) => {
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

exports.remove = (uID, result) => {
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