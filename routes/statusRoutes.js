const express = require("express");
const router = express.Router();
const Status = require("../model/status"); // Make sure the path is correct

// CREATE: Tambah data baru
router.post("/", async (req, res) => {
  try {
    const { indexStatus, nama, kategoriBerkas } = req.body;
    const newStatus = new Status({ indexStatus, nama, kategoriBerkas });
    await newStatus.save();
    res.status(201).json(newStatus);
  } catch (error) {
    res.status(400).json({ message: "Error creating status", error });
  }
});

// READ: Ambil semua data
router.get("/", async (req, res) => {
  try {
    const statuses = await Status.find();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching statuses", error });
  }
});

// READ: Ambil data berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const status = await Status.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: "Error fetching status", error });
  }
});

// UPDATE: Perbarui data berdasarkan ID
router.put("/:id", async (req, res) => {
  try {
    const { indexStatus, nama, kategoriBerkas } = req.body;
    const updatedStatus = await Status.findByIdAndUpdate(
      req.params.id,
      { indexStatus, nama, kategoriBerkas },
      { new: true }
    );
    if (!updatedStatus) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: "Error updating status", error });
  }
});

// DELETE: Hapus data berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedStatus = await Status.findByIdAndDelete(req.params.id);
    if (!deletedStatus) {
      return res.status(404).json({ message: "Status not found" });
    }
    res.status(200).json({ message: "Status deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting status", error });
  }
});

module.exports = router;
