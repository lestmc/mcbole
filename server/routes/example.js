const router = require('express').Router();
const Example = require('../models/Example');

// 获取所有示例
router.get('/', async (req, res) => {
  try {
    const examples = await Example.findAll();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 创建新示例
router.post('/', async (req, res) => {
  try {
    const newExample = await Example.create(req.body);
    res.status(201).json(newExample);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 