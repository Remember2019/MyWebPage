const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// 使用 CORS 中间件
app.use(cors());

// 设置代理路由
app.get('/api', async (req, res) => {
    try {
        const apiUrl = 'http://www.sdsddk.sdnu.edu.cn/wxapp/pay/queryElectricity';
        const queryParams = req.query;
        const response = await axios.get(apiUrl, { params: queryParams });
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Failed to fetch data from API');
    }
});

// 启动服务器
app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
