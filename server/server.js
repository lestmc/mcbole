const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/database');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 5000;

// CORS配置
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// 初始化管理员账号
async function initAdminUser() {
  try {
    const adminExists = await User.findOne({
      where: {
        username: 'root'
      }
    });

    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('zF123456', salt);
      
      await User.create({
        username: 'root',
        password: hashedPassword,
        email: 'admin@mcbole.com',
        role: 'admin'
      });
      
      console.log('管理员账号创建成功');
    }
  } catch (error) {
    console.error('创建管理员账号失败:', error);
  }
}

// 测试数据库连接并初始化
(async () => {
  try {
    await sequelize.authenticate();
    console.log('SQLite数据库连接成功');
    await sequelize.sync();
    console.log('所有模型同步完成');
    
    // 初始化管理员账号
    await initAdminUser();
  } catch (error) {
    console.error('无法连接到数据库:', error);
  }
})();

// 路由
const authRouter = require('./routes/auth');
const exampleRouter = require('./routes/example');

app.use('/api/auth', authRouter);
app.use('/api/examples', exampleRouter);

app.listen(port, () => {
  console.log(`服务器运行在端口: ${port}`);
}); 