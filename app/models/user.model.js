const sql = require("./db.js").pool;

// constructor
const User = function(user) {
	this.name = user.name;
	//this.email = user.email;
	//this.phone_number = user.phone_number;
	//this.age = user.age;
	//this.height = user.height;
	//this.weight = user.weight;
};

User.findById = (uID, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);
		
		else {
			conn.query("select * from users where uID = ?", uID, (err, res) => {	
				conn.release();

				if(err) {
					console.log(err);
					result(err, null);
				}

				else {
					if(res.length) result(null, res[0]);

					else result(new Error("No AffectedRows"), null);
				}
			});
		}
	});
};

User.findByName = (uName, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("select * from users where name = ?", uName, (err, res) => {
				conn.release();

				if(err) {
					console.log(err);
					result(err, null);
				}

				else {
					if(res.length) result(null, res[0]);

					else result(new Error("No AffectedRows"), null);
				}
			})
		}
	});
};

User.create = (newUser, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("insert into users SET ?", newUser, (err, res) => {
				conn.release();	

				if(err) {
					console.log(err);
					result(err, null);
				}
				
				else result(null, {uID: res.insertId});
			});
		}
	});
};

User.update = (uID, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("유저 정보 업데이트", (err, res) => {
				conn.release()

				if(err) {
					console.log(err);
					result(err);
				}

				else {
					if(res.affectedRows > 0) result(null)					
					
					else result(new Error("No AffectedRows"));				
				}
			});
		}
	});
};

User.remove = (uID, result) => {
	sql.getConnection((err, conn) => {
		if(err) console.log(err);

		else {
			conn.query("delete from users where uID = ?", uID, (err, res) => {
				conn.release();

				if(err) {
					console.log(err);
					result(err);
				}

				else {
					if(res.affectedRows > 0) result(null);
					
					else result(new Error("No AffectedRows"));
				}
			});
		}
	});
};

module.exports = User;