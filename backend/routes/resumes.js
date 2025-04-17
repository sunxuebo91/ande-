
const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// 创建简历
router.post('/', async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).send(resume);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// 获取所有简历
router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.send(resumes);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
