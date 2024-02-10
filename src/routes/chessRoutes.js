const express = require('express');
const router = express.Router();
const ChessController = require('../controllers/chess.controller');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.get('/top-players', ChessController.getTopPlayers);
router.get('/player/:username/rating-history', ChessController.getRatingHistory);
router.get('/players/rating-history-csv', ChessController.downloadRatingHistoryCsv);
router.post('/top-players', ChessController.addNewPlayers);

module.exports = router;
