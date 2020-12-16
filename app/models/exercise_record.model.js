const sql = require("./db.js").pool

exports.findById = (uID, result) => {
	sql.getConnection((err, conn) => {
		if(err) result(err, null);
		
		else {
			conn.query("select * from exercise_records where uID = ?", uID, (err, res) => {
				conn.release();

				if(err) result(err, null);

				else result(null, res);
			});
		}
	});
};

// 운동 기록 추가
exports.create = (newEr, result) => {
	sql.getConnection((err, conn) => {
		if(err) result(err);

		else {
			conn.query("insert into exercise_records SET ?", newEr, (err, res) => {
				conn.release();

				if(err) result(err);
			
				else result(null);
			});
		}
	});
};