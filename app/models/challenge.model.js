const sql = require("./db.js").pool2

// 생성자
const Challenge = function(challenge) {
	this.name = challenge.name;
	this.description = challenge.description;
	//this.calorie_consume = challenge.calorie_consume;
	//this.start_datetime = challenge.start_datetime;
	//this.finish_datetime = challenge.finish_datetime;
	//this.perform_day = goingOn.perform_day;
}

// challenge에 추가하고 goingon에도 추가 + invited에 초대한 친구 추가
Challenge.create = async ({newChallenge, newGoingOn, friendIDs}, result) => {	
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			await conn.beginTransaction();

			let res = await conn.query("insert into challenges SET ?", newChallenge);

			let cID = res[0].insertId;

			await conn.query("insert into goingon SET ?", {uID: newGoingOn.uID, cID: cID});

			for(i = 0; i < friendIDs.length; i++) {
				await conn.query("insert into invited SET ?", {uID: friendIDs[i], cID: cID});
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

// invited에서 제거하고 goingon에 추가
Challenge.accept = async ({uID, cID}, result) => {
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

// goingon에서 제거하고 finished에 추가
Challenge.finish = ({uID, cID}, result) => {

};

// challenge가 아니라 goingon에서 삭제
Challenge.remove = (cID, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("delete from goingon where ")
		}
	})
}

module.exports = Challenge