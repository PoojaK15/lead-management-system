const express = require('express');
const { createLead, getLeads, updateLeadStatus } = require('../controllers/lead.controller');
const protect = require('../middleware/auth');

const router = express.Router();

router.post('/', createLead);
router.get('/', protect, getLeads);
router.patch('/:id/status', protect, updateLeadStatus);

module.exports = router;