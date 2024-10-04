const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 中间件:解析 JSON 请求体
app.use(express.json());

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 根路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 设置
app.post('/api/playSetting', (req, res) => {
    const data = req.body;

    const fs = require('fs');
    const settingsFilePath = path.join(__dirname, 'data', 'settings.json');

    // 将数据写入文件
    fs.writeFile(settingsFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('保存设置时出错:', err);
            res.status(500).json({ message: '保存设置失败', error: err.message });
        } else {
            console.log('设置已保存到文件');
            res.json({ message: '操作成功' });
        }
    });
    res.json({ message: '设置成功!', data });
});


// 读取文件
app.post('/api/getSettings', (req, res) => {
    console.log('req, res: ', req, res);
    const fs = require('fs');
    const settingsFilePath = path.join(__dirname, 'data', 'settings.json');

    fs.readFile(settingsFilePath, 'utf8', (err, data) => {
        console.log('data: ', data);
        if (err) {
            console.error('读取设置时出错:', err);
            res.status(500).json({ message: '读取设置失败', error: err.message });
        } else {
            console.log('设置已读取:', data);
            res.json({ message: '设置读取成功', data });
        }
    });
});



// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
