const express = require('express');
const router = express.Router();

const db = require('../controllers/dataController');

router.get('/counts', (req, res) => {
  // data -> db에서 cb 받아온 counts 값
  db.getCounts((data) => {
    res.send(data);
  });
});

router.post('/inccounts', (req, res) => {
  db.incCounts((msg) => {
    res.send(msg);
  });
});

router.get('/survey', (req, res) => {
  db.getSurvey((data) => {
    // console.log(data);
    res.send(data);
  });
});

router.get('/explanation', (req, res) => {
  db.getExplanation((data) => {
    // console.log('설명 데이터', data);
    res.send(data);
  });
});

module.exports = router;
