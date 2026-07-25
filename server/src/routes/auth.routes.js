const express = require('express');
const { loginAdmin, getMe, createAdmin } = require('../controllers/auth.controller');
const protect = require('../middleware/auth');

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/create-admin', createAdmin);
router.get('/me', protect, getMe);

module.exports = router;