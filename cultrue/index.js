const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// 使用 CORS 中间件
app.use(cors());

// 设置代理路由
app.get('/proxy', async (req, res) => {
    try {
        const response = await axios.get('http://www.baidu.com');
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error');
    }
});

// 启动服务器
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
