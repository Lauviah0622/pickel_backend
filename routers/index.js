const express = require('express');

const router = express.Router();

const eventController = require('../controllers/eventController');

router.post('/event', eventController.createEvent)
router.get('/event/:suffix', eventController.getEvent)
router.put('/event/:suffix', eventController.updateEvent)


module.exports = (app) => {
    app.use(router)
}





