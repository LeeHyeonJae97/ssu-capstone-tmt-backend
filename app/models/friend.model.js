const sql = require("./db.js").pool;

exports.add = (newFriend, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("insert into friends SET ?", newFriend, (err, res) => {
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

exports.remove = (uID, friend_uID, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("delete from friends where uID = ? and friend_uID = ?", uID, friend_uID, (err, res) => {
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