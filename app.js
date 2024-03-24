const express = require('express');
const bodyParser = require('body-parser');
const UserController = require('./controllers/UserController');

class App {
  constructor() {
    this.app = express();
    this.jsonexp();
    this.apis();
    this.startserver();
  }

  jsonexp() {
    this.app.use(bodyParser.json());
  }

  apis() {
    const userController = new UserController();

    this.app.post('/createAccount', userController.createAccount.bind(userController));
    this.app.post('/login', userController.login.bind(userController));
  }

  startserver() {
    const PORT = process.env.PORT || 3002;
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

new App();