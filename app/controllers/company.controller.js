const db = require("../models");
const Company = db.company

exports.createCompany = async (req,res) => {
  try {
    const company = await Company.create(req.body);
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Read all companies
exports.getAllCompanies = async (req,res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Read a specific company by ID
exports.getCompanyById = async (req,res) => {
  try {

    const { id } = req.params;

    const company = await Company.findByPk(id);
    if (!company) {
      throw new Error('Company not found');
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update a company
exports.updateCompany = async (req,res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      throw new Error(  'Company not found');
    }
    await company.update(req.body);
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete a company
exports.deleteCompany = async (req,res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      throw new Error('Company not found');
    }
    await company.destroy();
    res.json({ message: 'Company deleted successfully' }); ;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}