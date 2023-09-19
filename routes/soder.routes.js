const express = require('express');
const router = express.Router();

const tutorials = require('../controllers/tutorial.controller.js');

router.get('/', tutorials.findAll);

// router.get('/', function (reg, res) {
//   res.send('S-Order List');
// });

router.get('/detail', function (req, res) {
  res.send('S-Order Details');
});

module.exports = router;
