const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

router.get('/', (req, res) => {
  res.json(members);
});

router.get('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
  };
  if (!newMember.name)
    return res.status(400).json({ msg: 'Please include a name and email' });

  members.push(newMember);

  res.json(members);
});

router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        res.json({ msg: 'Member updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res.status(400).json({ msg: `Member ${req.params.id} not found` });
  }
});

module.exports = router;
