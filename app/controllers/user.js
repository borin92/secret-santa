const { json } = require("express");
const userModel = require("../models/user.js");

module.exports = class user {
    constructor(app, connect) {
        this.app = app;
        this.userModel = connect.model('users', userModel);
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
     * show by email
     */
    showByEmail() {
        this.app.get('/users/:email', (req, res) => {
            try {
                if (!req.params.email) {
                    res.status(400).json({
                        status: 400,
                        message: 'Bad Request : Please use a email in the query string parameter'
                    })

                    return;
                }

                this.userModel.find({ email: new RegExp(req.params.email, 'i'), function (err, docs) {}}).then((user) => {
                    res.status(200).json(user || {})
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] get:email/:email -> ${err}`)

                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error'
                })
            }
        })
    }

    /**
     * showAll
     */
    showAll() {
        this.app.get('/users', (req, res) => {
            try {
                this.userModel.find().then((users) => {
                    res.status(200).json(users)
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] get:users -> ${err}`)

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

                this.userModel.deleteOne({ _id: req.params.id }).then((user) => {
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

                const options = { new: true, runValidators: true };

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
        this.app.post('/user', async (req, res) => {
            try {

                const query = await this.userModel.findOneAndUpdate({ email: req.body.email }, { $set: { password: req.body.password } })
                if (!query) {
                    res.status(500).json({
                        status: 500,
                        message: 'We cant find you in the database, please ask your admin to create an account'
                    })
                }
                else (res.status(200).json({
                    query
                }))

                //return res.json(test)

                /*          else {

                         } */
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
        this.showByEmail()
        this.showAll()
        this.delete()
        this.update()
        this.create()
    }
}
