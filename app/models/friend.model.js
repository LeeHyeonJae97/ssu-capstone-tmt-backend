const sql = require("./db.js").pool;
const sql2 = require("./db.js").pool2;

// 模备 格废 盎脚
exports.find = async (uID, result) => {
	try {
		const conn = await sql2.getConnection(async conn => conn);

		try {
			let [rows_friends, fields_friends] = conn.query("select friend_uID from friends where uID = ?", uID);
			for(i = 0; i < rows_friends.length; i++) {
				let [rows_public, fields_public] = conn.query("select public from users where uID = ?", rows_friends[i].uID);

				if(rows_public[0].public) {				
					[rows_friends, fields_friends] = conn.query("select name, email, phone_number, age, height, weight, public from users where uID = ?",
						rows_friends[i].friend_uID);
				}
			}

			let [rows_request, fields_request] = conn.query("select friend_uID from request where uID = ?", uID);			

			result(null, {friends: rows_friends, request: rows_request});
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

// 模备 昏力
exports.remove = (uID, friend_uID, result) => {
	sql.getConnection((err, conn) => {
		if(err) result(err);

		else {
			conn.query("delete from friends where uID = ? and friend_uID = ?", uID, friend_uID, (err, res) => {
				conn.release();

				if(err) result(err);
				
				else {
					if(res.affectedRows > 0) result(null);

					else result(new Error("No AffectedRows"));
				}
			});
		}
	});
};

// 模备 眠啊 夸没
exports.request = async (newFriend, result) => {
	try {
		const conn = await sql2.getConnection(async conn => conn);

		try {
			let [rows, fields] = await conn.query("select * from friends where uID = ? and friend_uID = ?", [newFriend.uID, newFriend.friend_uID]);

			if(rows.length) throw new Error("friend is double");

			else {
				await conn.query("insert into request SET ?", newFriend);
				result(null);
			}
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

// 模备 夸没 荐遏
exports.accept = async (uID, friend_uID, result) => {
	try {
		const conn = await sql2.getConnection(async conn => conn);

		try {
			await conn.beginTransaction();

			let res = await conn.query("delete from request where uID = ? and friend_uID = ?", [friend_uID, uID]);
			if(res[0].affectedRows == 0) {
				throw new Error("No AffectedRows");				
			}

			await conn.query("insert into friends SET ?", {uID: uID, friend_uID: friend_uID});

			await conn.query("insert into friends SET ?", {uID: friend_uID, friend_uID: uID});

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

// 模备 夸没 芭例
exports.decline = (uID, friend_uID, result) => {
	sql.getConnection((err, conn) => {
		if(err) result(err);

		else {
			conn.query("delete from request where uID = ? and friend_uID = ?", [friend_uID, uID], (err, res) => {
				conn.release();

				if(err) result(err);
				
				else {
					if(res.affectedRows > 0) result(null);

					else result(new Error("No AffectedRows"));
				}
			});
		}
	});
};