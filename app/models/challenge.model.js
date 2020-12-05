const sql = require("./db.js").pool2

// ����
// challenges�� routines�� �߰��ϰ� goingon�� invited�� �ʴ��� ģ�� �߰�
exports.create = async (uID, data, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			await conn.beginTransaction();

			let res = await conn.query("insert into challenges SET ?", {name: data.name, description: data.description, calorie_consume: data.calorie_consume,
				start_datetime: data.start_datetime, finish_datetime: data.finish_datetime, perform_day: data.perform_day});

			let cID = res[0].insertId;

			for(i = 0; i < data.eID.length; i++) {
				await conn.query("insert into routines SET ?", {cID: cID, eID: data.eID[i], target_total_count: data.target_total_count[i]});
			}

			await conn.query("insert into goingon SET ?", {uID: uID, cID: cID});

			if(data.hasOwnProperty("friend_uIDs")) {
				for(i = 0; i < data.friend_uIDs.length; i++) {
					await conn.query("insert into invited SET ?", {uID: data.friend_uIDs[i], cID: cID});
				}
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