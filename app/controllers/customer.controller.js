const Customer = require('../models/customer.model');
// Create a customer
exports.create = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

// Read all customers
exports.readAll = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

// Read a customer by ID
exports.get = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      res.json(customer);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
};

// Update a customer
exports.update = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      await customer.update(req.body);
      res.json(customer);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

// Delete a customer
exports.delete = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
    } else {
      await customer.destroy();
      res.json({ message: 'Customer deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};
