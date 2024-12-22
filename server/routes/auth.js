const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/email');

// 注册路由
router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // 检查用户是否已存在
    const existingUser = await User.findOne({
      where: {
        username: username
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建用户
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      role: 'user' // 默认角色为普通用户
    });

    res.status(201).json({
      message: '注册成功',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 登录路由
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await User.findOne({
      where: {
        username: username
      }
    });

    if (!user) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }

    // 验证密码
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: '用户名或密码错误' });
    }

    // 生成JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 创建管理员账号的路由（仅在开发环境使用）
router.post('/create-admin', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    
    // 检查是否已存在管理员
    const adminExists = await User.findOne({
      where: {
        role: 'admin'
      }
    });

    if (adminExists) {
      return res.status(400).json({ message: '管理员账号已存在' });
    }

    // 加密密码
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建管理员账号
    const admin = await User.create({
      username,
      password: hashedPassword,
      email,
      role: 'admin'
    });

    res.status(201).json({
      message: '管理员账号创建成功',
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 添加发送验证码的路由
router.post('/send-code', async (req, res) => {
  try {
    const { email } = req.body;
    const code = Math.random().toString().slice(2, 8);
    
    // 存储验证码（这里使用内存存储，实际应用中应该使用Redis）
    const verificationCodes = new Map();
    verificationCodes.set(email, {
      code,
      timestamp: Date.now()
    });

    // 发送验证码邮件
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'MCBole - 邮箱验证码',
      html: `
        <h1>MCBole 邮箱验证</h1>
        <p>您的验证码是：<strong>${code}</strong></p>
        <p>验证码有效期为5分钟。</p>
      `
    });

    res.json({ message: '验证码已发送' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 