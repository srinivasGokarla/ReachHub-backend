const Chess = require("../models/chess.model");
const { createObjectCsvWriter } = require('csv-writer');

exports.getTopPlayers = async (req, res) => {

    try {
        const topPlayers = await Chess.find()
       
      res.json(topPlayers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.addNewPlayers = async (req, res) => {

    try {
        const { id, username, perfs, patron } = req.body;
        const existingPlayer = await Chess.findOne({ username });
        if (existingPlayer) {
          return res.status(400).json({ message: 'Player already exists' });
        }
        const newPlayer = new Chess({
          id,
          username,
          perfs,
          patron
        });
        await newPlayer.save();
    
        res.status(201).json(newPlayer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getRatingHistory = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await Chess.findOne({ username });
        if (!user) {
          return res.status(404).json({ message: 'Chess not found' });
        }
        res.json(user.perfs.classical);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.downloadRatingHistoryCsv = async (req, res) => {

    try {
        const topPlayers = await Chess.find()
        
  
      const csvData = topPlayers.map(player => ({
        username: player.username,
        rating30DaysAgo: player.perfs.classical.rating - 30 * player.perfs.classical.progress,
        ratingHistory: JSON.stringify(Array.from({ length: 31 }, (_, i) => ({
          date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
          rating: player.perfs.classical.rating - (30 - i) * player.perfs.classical.progress,
        }))),
      }));
  
      const csvWriter = createObjectCsvWriter({
        path: 'rating_history.csv',
        header: [
          { id: 'username', title: 'Username' },
          { id: 'rating30DaysAgo', title: 'Rating 30 Days Ago' },
          { id: 'ratingHistory', title: 'Rating History' },
        ],
      });
  
      await csvWriter.writeRecords(csvData);
      res.download('rating_history.csv');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };