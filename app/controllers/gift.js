const giftModel = require('../models/gift.js');

module.exports = class gift {
    constructor(app, connect) {
        this.app = app;
        this.giftModel = connect.model('gift', giftModel);
        this.run();
    }

    /**
     * show
     */
    show() {
        this.app.get('/gift/:id', (req, res) => {
            try {
                if (!req.params.id) {
                    res.status(400).json({
                        status: 400,
                        message: 'Bad Request : Please use a id in the query string parameter'
                    })

                    return;
                }

                this.giftModel.findById(req.params.id).then((gift) => {
                    res.status(200).json(gift || {})
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] get:gifts/:id -> ${err}`)

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
        this.app.get('/gifts', (req, res) => {
            try {
                this.giftModel.find().then((gifts) => {
                    res.status(200).json(gifts)
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] get:gifts -> ${err}`)

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
        this.app.delete('/gift/:id', (req, res) => {
            try {
                if (!req.params.id) {
                    res.status(400).json({
                        status: 400,
                        message: 'Bad Request : Please use a id in the query string parameter'
                    })

                    return;
                }

                this.giftModel.deleteOne({ _id: req.params.id }).then((gift) => {
                    res.status(200).json(gift || {})
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] delete:gifts/:id -> ${err}`)

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
        this.app.put('/update/gift/:id', (req, res) => {
            try {
                if (!req.params.id) {
                    res.status(400).json({
                        status: 400,
                        message: 'Bad Request : Please use a id in the query string parameter'
                    })

                    return;
                }

                const options = { new: true, runValidators: true };

                this.giftModel.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    options
                ).then((giftUpdated) => {
                    res.status(200).json(giftUpdated || {})
                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: err
                    })
                })
            } catch (err) {
                console.error(`[ERROR] delete:gifts/:id -> ${err}`)

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
        this.app.post('/gift/addOne', (req, res) => {
            const giftModel = new this.giftModel(req.body)
            try {
                this.giftModel.find({ id: req.body.santa, function(err, docs) { } }).then((gift) => {
                    console.log(gift)
                    if (gift[0]) {
                        this.giftModel.findByIdAndUpdate(gift[0].santa,
                            {

                                userGifted: req.body.userGifted,
                                gift: req.body.gift,
                                giftMessage: req.body.gift.message,

                            }
                        ).then((giftUpdated) => {
                            console.log(giftUpdated)
                            res.status(200).json(giftUpdated || {})
                        }).catch((err) => {
                            res.status(400).json({
                                status: 400,
                                message: err
                            })
                        })
                    }
                    else {
                        giftModel.save().then((gift) => {
                            res.status(200).json(gift || {})
                        }).catch((err) => {
                            res.status(400).json({
                                status: 400,
                                message: err
                            })
                        })
                    }

                }).catch((err) => {
                    res.status(400).json({
                        status: 400,
                        message: "wrong email"
                    })
                })

            } catch (err) {
                console.error(`[ERROR] post:gifts/ -> ${err}`)

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
        this.showAll()
        this.delete()
        this.update()
        this.create()
    }
}

