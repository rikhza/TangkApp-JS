const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Import the Role model
const Roles = require('../model/roles');

// GET all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Roles.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error });
  }
});

// GET role by ID
router.get('/:id', async (req, res) => {
  try {
    const role = await Roles.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching role', error });
  }
});

// POST create new role
router.post('/', async (req, res) => {
  try {
    const newRole = new Roles(req.body);
    const savedRole = await newRole.save();
    res.status(201).json(savedRole);
  } catch (error) {
    res.status(500).json({ message: 'Error creating role', error });
  }
});

// PUT update role by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRole = await Roles.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: 'Error updating role', error });
  }
});

// DELETE role by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRole = await Roles.findByIdAndDelete(req.params.id);
    if (!deletedRole) {
      return res.status(404).json({ message: 'Role not found' });
    }
    res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting role', error });
  }
});

module.exports = router;
