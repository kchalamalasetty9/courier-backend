const db = require("../models");
const Courier = db.courier;

// Create a courier
exports.create = async (req, res) => {
  try {
    const courier = await Courier.create(req.body);
    res.json(courier);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create courier' });
  }
};

// Read all couriers
exports.readAll = async (req, res) => {
  try {
    const couriers = await Courier.findAll({ where: null });
    res.json(couriers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch couriers' });
  }
};

// Read a courier by ID
exports.get = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      res.status(404).json({ error: 'Courier not found' });
    } else {
      res.json(courier);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch courier' });
  }
};

// Update a courier
exports.update = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      res.status(404).json({ error: 'Courier not found' });
    } else {
      await courier.update(req.body);
      res.json(courier);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update courier' });
  }
};

// Delete a courier
exports.delete = async (req, res) => {
  try {
    const courier = await Courier.findByPk(req.params.id);
    if (!courier) {
      res.status(404).json({ error: 'Courier not found' });
    } else {
      await courier.destroy();
      res.json({ message: 'Courier deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete courier' });
  }
};
