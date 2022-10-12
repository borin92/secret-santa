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

}

