const express = require('express');
const router = express.Router();

const mongoDB = require('../controllers/mongoController');

router.post('/setData', async (req, res) => {
  const msg = await mongoDB.setData();
  res.send(JSON.stringify(msg));
});

module.exports = router;
