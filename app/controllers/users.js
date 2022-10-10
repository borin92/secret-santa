const usersModel = require('../models/users.js');

module.exports = class users {
    constructor(app, connect) {
        this.app = app;
        this.usersModel = connect.model('users', usersModel);
        this.run();
    }

    run() {
        this.app.get("/", (req, res) => {
            console.log(usersModel)
            res.json({ message: "Hello from server!" });
        });


    }
}