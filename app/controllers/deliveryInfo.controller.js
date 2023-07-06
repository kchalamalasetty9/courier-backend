const DeliveryInfo = require('../models/deliveryInfo.model');

// Create a delivery info
exports.create = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.create(req.body);
    res.json(deliveryInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create delivery info' });
  }
};

// Read all delivery info
exports.readAll = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.findAll();
    res.json(deliveryInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch delivery info' });
  }
};

// Read a delivery info by ID
exports.get = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.findByPk(req.params.id);
    if (!deliveryInfo) {
      res.status(404).json({ error: 'Delivery info not found' });
    } else {
      res.json(deliveryInfo);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch delivery info' });
  }
};

// Update a delivery info
exports.update = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.findByPk(req.params.id);
    if (!deliveryInfo) {
      res.status(404).json({ error: 'Delivery info not found' });
    } else {
      await deliveryInfo.update(req.body);
      res.json(deliveryInfo);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update delivery info' });
  }
};

// Delete a delivery info
exports.delete = async (req, res) => {
  try {
    const deliveryInfo = await DeliveryInfo.findByPk(req.params.id);
    if (!deliveryInfo) {
      res.status(404).json({ error: 'Delivery info not found' });
    } else {
      await deliveryInfo.destroy();
      res.json({ message: 'Delivery info deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to deletedelivery info' });
  }
};
