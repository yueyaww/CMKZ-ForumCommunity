var express = require('express');
var router = express.Router();
const config = require('../config.json');

var multer = require('multer');
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, config.uploadPath);
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);  
    }
});
// 创建 multer 对象
var upload = multer({ storage: storage });

let 用户_Controller =  require('../controller/用户_Controller.js');
router.post('/user/zhuce', 用户_Controller.zhuce);
router.post('/user/denglu', 用户_Controller.denglu);

module.exports = router;