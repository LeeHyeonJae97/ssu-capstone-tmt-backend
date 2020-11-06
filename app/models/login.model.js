//const sql = require("./db.js").pool;
const sql = require("./db.js").pool2;

exports.login = async (id, pw, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			// 로그인
			let [rows_login, fields_login] = await conn.query("select uID from login where id = ? and pw = ?", [id, pw]);
			if(!rows_login.length) throw new Error("No AffectedRows");

			let uID = rows_login[0].uID;

			// 유저 정보
			let [rows_users, fields_users] = await conn.query("select * from users where uID = ?", uID);
			if(!rows_users.length) throw new Error("No AffectedRows");

			// 운동기록
			let [rows_exercise_records, fields_exercise_reocrds] = await conn.query("select * from exercise_records where uID = ?", uID);						

			// 진행 중인 챌린지 정보
			let [rows_goingon, fields_goingon] = await conn.query("select cID from goingon where uID = ?", uID);
			if(rows_goingon.length) {			
				for(i = 0; i < rows_goingon.length; i++) {
					[rows_goingon[i], fields_goingon[i]] = await conn.query("select * from challenges where cID = ?", rows_goingon[i].cID);
				}
			}

			// 완료한 챌린지 정보
			let [rows_finished, fields_finished] = await conn.query("select cID from finished where uID = ?", uID);
			if(rows_finished.length) {
				for(i = 0; i < rows_finished.length; i++) {
					[rows_finished[i], fields_finished[i]]  = await conn.query("select * from challenges where cID = ?", rows_finished[i].cID);
				}
			}

			// 초대받은 챌린지 정보
			let [rows_invited, fields_invited] = await conn.query("select cID from invited where uID = ?", uID);
			if(rows_invited.length) {			
				for(i = 0; i< rows_invited.length; i++) {
					[rows_invited[i], fields_invited[i]]  = await conn.query("select * from challenges where cID = ?", rows_invited[i].cID);
				}
			}

			// 친구 정보
			let [rows_friends, fields_friends] = await conn.query("select friend_uID from friends where uID = ?", uID);			
			if(rows_friends.length) {
				for(i = 0; i < rows_friends.length; i++) {
					[rows_friends[i], fields_friends[i]] = await conn.query("select * from users where uID = ?", rows_friends[i].friend_uID);
				}
			}

			result(null, {users: rows_users, exercise: rows_exercise_records, goingon: rows_goingon, finished: rows_finished, invited: rows_invited, friends: rows_friends});
		}
		catch(err) {
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