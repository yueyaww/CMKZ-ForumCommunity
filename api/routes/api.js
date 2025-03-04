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

let userController = require('../controller/userController.js');
router.post('/user/zhuce', userController.zhuce);
router.post('/user/denglu', userController.denglu);
router.get('/users',userController.gets);
router.get('/user',userController.get);
router.post('/user/update', userController.update);

let roleController =  require('../controller/roleController.js');
router.get('/roles',roleController.gets);
router.post('/role',roleController.post);
router.delete('/role',roleController.delete);

let shequController =  require('../controller/shequController.js');
router.get('/shequs',shequController.gets);
router.post('/shequ',shequController.post);

let huatiController =  require('../controller/huatiController.js');
router.post('/huati/page',huatiController.page);
router.get('/huati',huatiController.get);
router.post('/huati',huatiController.post);

let huatihuifuController =  require('../controller/huatihuifuController.js');
router.get('/huatihuifus', huatihuifuController.gets);
router.post('/huatihuifu', huatihuifuController.post);

let wechatController =  require('../controller/wechatController.js');
router.get('/wechat/url', wechatController.get);
router.get('/wechat/queryOrder', wechatController.queryOrder);

let alicloudController =  require('../controller/alicloudController.js');
router.get('/alicloud/sendSMS', alicloudController.sendSMS);

let userGroupController =  require('../controller/userGroupController.js');
router.get('/userGroups', userGroupController.gets);
router.get('/userGroup', userGroupController.get);
router.post('/userGroup', userGroupController.post);
router.delete('/userGroup',userGroupController.delete);

let huatiTypeController =  require('../controller/huatiTypeController.js');
router.get('/huatiTypes', huatiTypeController.gets);
router.get('/huatiType', huatiTypeController.get);
router.post('/huatiType', huatiTypeController.post);
router.delete('/huatiType',huatiTypeController.delete);

let userHuatiTypeController =  require('../controller/userHuatiTypeController.js');
router.get('/userHuatiTypes', userHuatiTypeController.gets);
router.get('/userHuatiType', userHuatiTypeController.get);
router.post('/userHuatiType', userHuatiTypeController.post);
router.delete('/userHuatiType',userHuatiTypeController.delete);

module.exports = router;