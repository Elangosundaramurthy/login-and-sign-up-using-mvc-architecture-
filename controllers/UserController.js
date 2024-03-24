const UserModel = require('../models/UserModel');

class UserController {
  constructor() {
    this.userModel = new UserModel();
  }

  createAccount(req, res) {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    this.userModel.getUserByEmail(email, (err, results) => {
      if (err) {
        throw err;
      }
      if (results.length > 0) {
        return res.status(400).json({ error: 'Email is already registered' });
      }

      this.userModel.createUser(firstName, lastName, email, password, (err) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: 'Account created successfully' });
      });
    });
  }

  login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are not entered' });
    }

    this.userModel.getUserByEmail(email, (err, results) => {
      if (err) {
        throw err;
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = results[0];
      if (user.password !== password) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      res.status(200).json({ message: 'Logged in successfully' });
    });
  }
}

module.exports = UserController;
