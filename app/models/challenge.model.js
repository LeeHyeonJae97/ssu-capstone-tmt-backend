const sql = require("./db.js").pool2

// 생성
// challenges와 routines에 추가하고 goingon에도 추가 + invited에 초대한 친구 추가
exports.create = async ({uID, newChallenge, routines, friend_uIDs}, result) => {	
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			await conn.beginTransaction();

			let res = await conn.query("insert into challenges SET ?", newChallenge);

			let cID = res[0].insertId;

			for(i = 0; i < routines.length; i++) {
				await conn.query("insert into routines SET ?", {cID: cID, eID: routines[i].eID, target_total_count: routines[i].target_total_count});
			}

			await conn.query("insert into goingon SET ?", {uID: uID, cID: cID});

			for(i = 0; i < friend_uIDs.length; i++) {
				await conn.query("insert into invited SET ?", {uID: friend_uIDs[i], cID: cID});
			}

			await conn.commit();
			result(null, {cID : cID});
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

// 초대 수락
// invited에서 제거하고 goingon에 추가
exports.accept = async (uID, cID, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			await conn.beginTransaction();

			let res = await conn.query("delete from invited where uID = ? and cID = ?", [uID, cID]);
			if(res[0].affectedRows == 0) {
				throw new Error("No AffectedRows");				
			}

			await conn.query("insert into goingon SET ?", {uID: uID, cID: cID});

			await conn.commit();
			result(null);
		}
		catch(err) {
			await conn.rollback();
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

// 초대 거절
// invited에서 제거
exports.decline = async (uID, cID, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			await conn.query("delete from invited where uID = ? and cID = ?", [uID, cID]);
			if(res[0].affectedRows == 0) {
				throw new Error("No AffectedRows");
			}

			result(null);
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
}

// 완료
// goingon에서 제거하고 success에 추가
exports.success = async (uID, cID, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			await conn.beginTransaction();

			let res = await conn.query("delete from goingon where uID = ? and cID = ?", [uID, cID]);
			if(res[0].affectedRows == 0) {
				throw new Error("No AffectedRows");				
			}

			await conn.query("insert into success SET ?", {uID: uID, cID: cID});

			await conn.commit();
			result(null);
		}
		catch(err) {
			await conn.rollback();
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

// 실패 또는 중도 포기
// goingon에서 제거하고 failed에 추가
exports.fail = async (uID, cID, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			await conn.beginTransaction();

			let res = await conn.query("delete from goingon where uID = ? and cID = ?", [uID, cID]);
			if(res[0].affectedRows == 0) {
				throw new Error("No AffectedRows");				
			}

			await conn.query("insert into failed SET ?", {uID: uID, cID: cID});

			await conn.commit();
			result(null);
		}
		catch(err) {
			await conn.rollback();
			result(err);
		}
		finally {
			conn.release();
		}
	}
	catch(err) {
		result(err);
	}
}

// 실패 또는 중도 포기한 챌린지 삭제
// failed에서 제거
exports.remove = async (uID, cID, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			let res = await conn.query("delete from failed where uID = ? and cID = ?", [uID, cID]);
			if(res[0].affectedRows == 0) {
				throw new Error("No AffectedRows");				
			}

			// resFromGoingOn[0][0].count가 0이고 resFromFinished[0][0].count가 0이면 아무도 해당 챌린지에 대한 정보를 열람할 수가 없다.
			// 삭제해도 되지 않을까??		
			//let resFromGoingOn = await conn.query("select count(*) as count from goingon where cID = ?", cID);			
			//let resFromFinished = await conn.query("select count(*) as count from finished where cID = ?", cID);			

			result(null);
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