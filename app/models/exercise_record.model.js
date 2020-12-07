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

/*
ExerciseRecord.remove = (erID, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("delete from exercise_records where erID = ?", erID, (err, res) => {
				conn.release();

				if(err) {
					console.log(err);
					result(err, null);
				}

				else {
					if(res.affectedRows > 0) result(null, res);

					else result({kind: "not_found"}, null);
				}
			});
		}
	});
};
*/