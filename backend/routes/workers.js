
const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

// 创建劳动者简历
router.post('/', async (req, res) => {
  try {
    const worker = new Worker({
      ...req.body,
      // 确保包含列表页需要的所有字段
      name: req.body.name,
      age: req.body.age,
      phone: req.body.phone,
      hometown: req.body.hometown,
      type: req.body.type,
      orderStatus: req.body.orderStatus,
      expectedSalary: req.body.expectedSalary,
      workExperienceYears: req.body.workExperienceYears
    });
    
    await worker.save();
    res.status(201).send(worker);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// 获取所有劳动者
router.get('/', async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.send(workers);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

module.exports = router;
