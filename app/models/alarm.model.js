const sql = require("./db.js").pool

// 알람 수정
exports.update = (uID, alarm, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("update alarms SET ? where uID = ?", [alarm, uID], (err, res) => {
				conn.release();

				if(err) result(err);
			
				else if(res.affectedRows > 0) result(null)

				else result(new Error("No AffectedRows"));
			});
		}
	});
};