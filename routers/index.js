const express = require('express');

const router = express.Router();

const eventController = require('../controllers/eventController');
const pickController = require('../controllers/pickController');

router.post('/event', eventController.createEvent)
router.get('/event/:suffix', eventController.getEvent)
router.put('/event/:suffix', eventController.updateEvent)


router.get('/pick/:suffix', pickController.getPickingEvent)
router.post('/pick/:suffix', pickController.createPick)


module.exports = (app) => {
    app.use(router)
}





