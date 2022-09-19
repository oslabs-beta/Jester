// routes for front-end to get generated test code on submit
const express = require('express');
const router = express.Router();
const testsController = require('../controllers/testsController');

router.post('/', (req, res) => {
  console.log('in /api/tests post route');
  res.status(200).json({ generated_code: 'test' });
});

module.exports = router;
