const express = require('express');
const router = express.Router();
const members = require('../../Members');

router.get('/', (req, res) => {
  res.json(members);
});

router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ msg: `Member ${req.params.id} not found` });
  }
});

router.post('/', (req, res) => {
  console.log(1);
  res.send(req.body);
});

module.exports = router;
