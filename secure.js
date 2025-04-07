// backend/routes/secure.js
const express = require('express');
const router = express.Router();
const admin = require('../firebase');

router.post('/verify', async (req, res) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    res.status(200).json({ message: 'Token verified!', uid: decoded.uid });
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;
