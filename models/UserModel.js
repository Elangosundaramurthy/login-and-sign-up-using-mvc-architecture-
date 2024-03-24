const mysql = require('mysql');

class UserModel {
  constructor() {
    this.db = mysql.createConnection({
      host: 'localhost',
      port: 3309,
      user: 'root',
      password: '',
      database: 'login'
    });
    this.connect();
  }

  connect() {
    this.db.connect((err) => {
      if (err) {
        throw err;
      }
      console.log('MySQL Connected');
    });
  }

  createUser(firstName, lastName, email, password, callback) {
    this.db.query('INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)', [firstName, lastName, email, password], callback);
  }

  getUserByEmail(email, callback) {
    this.db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  }
}

module.exports = UserModel;
