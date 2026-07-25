const Lead = require('../models/lead');

exports.createLead = async (req, res) => {
  try {
    const { name, email, budget, message } = req.body;

    if (!name || !email || !budget || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email' });
    }

    const lead = await Lead.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      budget: budget.trim(),
      message: message.trim(),
      status: 'New',
    });

    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to save lead' });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const search = req.query.search || '';
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { status: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to fetch leads' });
  }
};

exports.updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'Closed'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found' });
    }

    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to update lead' });
  }
};