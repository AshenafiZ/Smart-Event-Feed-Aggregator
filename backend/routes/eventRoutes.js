const express = require('express');
const { getEvents, getStats } = require('../controllers/eventController');
const router = express.Router();

router.get('/events', getEvents);
router.get('/stats', getStats);

module.exports = router;