const Clerk = require('../models/clerk.model');

// Create a clerk
exports.create = async (req, res) => {
  try {
    const clerk = await Clerk.create(req.body);
    res.json(clerk);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create clerk' });
  }
};

// Read all clerks
exports.readAll = async (req, res) => {
  try {
    const clerks = await Clerk.findAll();
    res.json(clerks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch clerks' });
  }
};

// Read a clerk by ID
exports.get = async (req, res) => {
  try {
    const clerk = await Clerk.findByPk(req.params.id);
    if (!clerk) {
      res.status(404).json({ error: 'Clerk not found' });
    } else {
      res.json(clerk);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch clerk' });
  }
};

// Update a clerk
exports.update = async (req, res) => {
  try {
    const clerk = await Clerk.findByPk(req.params.id);
    if (!clerk) {
      res.status(404).json({ error: 'Clerk not found' });
    } else {
      await clerk.update(req.body);
      res.json(clerk);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update clerk' });
  }
};

// Delete a clerk
exports.delete = async (req, res) => {
  try {
    const clerk = await Clerk.findByPk(req.params.id);
    if (!clerk) {
      res.status(404).json({ error: 'Clerk not found' });
    } else {
      await clerk.destroy();
      res.json({ message: 'Clerk deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete clerk'});
  }
};

