const express = require('express');
const Resume = require('../models/Resume');

const router = express.Router();

// Get all resumes
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific resume
router.get('/:id', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new resume
router.post('/', async (req, res) => {
  const resume = new Resume(req.body);
  try {
    const savedResume = await resume.save();
    res.status(201).json(savedResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a resume
router.put('/:id', async (req, res) => {
  try {
    const updatedResume = await Resume.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a resume
router.delete('/:id', async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: 'Resume deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
