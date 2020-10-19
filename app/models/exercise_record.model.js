const sql = require("./db.js").pool

// »ý¼ºÀÚ
const ExerciseRecord = function(exerciseRecord) {
	this.uID = exerciseRecord.uID;
	this.time = exerciseRecord.time;
};

ExerciseRecord.create = (newEr, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			console.log(newEr);
			console.log(newEr.uID);
			console.log(newEr.time);
			console.log({newEr:uID, newEr:time});

			conn.query("insert into exercise_records SET ?", newEr, (err, res) => {
				conn.release();

				if(err) {
					console.log(err);
					result(err, null);
				}

				else result(null, {erID: res.insertId});
			});
		}
	});
};

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

module.exports = ExerciseRecord;