const express = require('express');
const app = express();
const port = 3000;

// 中间件:解析 JSON 请求体
app.use(express.json());

// 根路由
app.get('/', (req, res) => {
    res.send('欢迎使用 Express API!');
});

// 示例 GET 接口
app.get('/api/hello', (req, res) => {
    res.json({ message: '你好,世界!' });
});

// 示例 POST 接口
app.post('/api/data', (req, res) => {
    const data = req.body;
    res.json({ received: data });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
