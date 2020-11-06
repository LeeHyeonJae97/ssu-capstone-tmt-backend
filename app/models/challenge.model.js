const sql = require("./db.js").pool2

// ����
// challenges�� routines�� �߰��ϰ� goingon���� �߰� + invited�� �ʴ��� ģ�� �߰�
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

// �ʴ� ����
// invited���� �����ϰ� goingon�� �߰�
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

// �ʴ� ����
// invited���� ����
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

// �Ϸ�
// goingon���� �����ϰ� success�� �߰�
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

// ���� �Ǵ� �ߵ� ����
// goingon���� �����ϰ� failed�� �߰�
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

// ���� �Ǵ� �ߵ� ������ ç���� ����
// failed���� ����
exports.remove = async (uID, cID, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			let res = await conn.query("delete from failed where uID = ? and cID = ?", [uID, cID]);
			if(res[0].affectedRows == 0) {
				throw new Error("No AffectedRows");				
			}

			// resFromGoingOn[0][0].count�� 0�̰� resFromFinished[0][0].count�� 0�̸� �ƹ��� �ش� ç������ ���� ������ ������ ���� ����.
			// �����ص� ���� ������??		
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