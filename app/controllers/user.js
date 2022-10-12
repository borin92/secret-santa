const userModel = require("../models/user.js");

module.exports = class user {
    constructor(app, connect) {
        this.app = app;
        this.userModel = connect.model('user', userModel);
        this.run();
    }

    /**
     * show
     */
    show() {
        this.app.get('/user/:id', (req, res) => {
            try {
                if (!req.params.id) {
                    res.status(400).json({
                        status: 400,
                        message: 'Bad Request : Please use a id in the query string parameter'
                    })

                    return;
                }

                this.userModel.findById(req.params.id).then((user) => {
                    res.status(200).json(user || {})
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] get:users/:id -> ${err}`)

                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                })
            }
        })
    }

    /**
     * delete
     */
    delete() {
        this.app.delete('/user/:id', (req, res) => {
            try {
                if (!req.params.id) {
                    res.status(400).json({
                        status: 400,
                        message: 'Bad Request : Please use a id in the query string parameter'
                    })

                    return;
                }

                this.userModel.deleteOne({_id: req.params.id}).then((user) => {
                    res.status(200).json(user || {})
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] delete:users/:id -> ${err}`)

                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                })
            }
        })
    }

    /**
     * update
     */
    update() {
        this.app.put('/user/:id', (req, res) => {
            try {
                if (!req.params.id) {
                    res.status(400).json({
                        status: 400,
                        message: 'Bad Request : Please use a id in the query string parameter'
                    })

                    return;
                }

                const options = {new: true, runValidators: true};

                this.userModel.findByIdAndUpdate(
                  req.params.id,
                  req.body,
                  options
                ).then((userUpdated) => {
                    res.status(200).json(userUpdated || {})
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] delete:users/:id -> ${err}`)

                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                })
            }
        })
    }

    /**
     * create
     */
    create() {
        this.app.post('/user/', (req, res) => {
            try {
                const userModel = new this.userModel(req.body)

                userModel.save().then((user) => {
                    res.status(200).json(user || {})
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] post:users/ -> ${err}`)

                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                })
            }
        })
    }

    /**
     * Run crud
     */
    run() {
        this.show()
        this.delete()
        this.update()
        this.create()
    }
}
