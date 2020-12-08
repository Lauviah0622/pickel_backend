const express = require('express');

const router = express.Router();

const eventController = require('../controllers/eventController');

router.get('/event/:suffix', eventController.getEvent)
router.post('/event', eventController.createEvent)

module.exports = (app) => {
    app.use(router)
}





