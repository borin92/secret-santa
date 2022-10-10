const giftModel = require('../models/gift.js');

module.exports = class gift {
    constructor(app, connect) {
        this.app = app;
        this.giftModel = connect.model('gift', giftModel);
        this.run();
    }

    run() {
        this.app.get("/", (req, res) => {
            console.log(giftModel)
            res.json({ message: "Hello from gift!" });
        });


    }
}