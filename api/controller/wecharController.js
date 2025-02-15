const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const forge = require('node-forge');

const config = {
  mchid: '你的商户号', // 替换为你的商户号
  appid: '你的appid', // 替换为你的appid
  apiV3Key: '你的APIv3密钥', // 替换为你的APIv3密钥
  serialNo: '你的证书序列号', // 替换为你的证书序列号
  privateKey: fs.readFileSync('path/to/your/private/key.pem'), // 替换为你的私钥文件路径
};

function generateSignature(method, url, body, timestamp, nonce) {
  const message = `${method}\n${url}\n${timestamp}\n${nonce}\n${body}\n`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(message);
  return signer.sign(config.privateKey, 'base64');
}

exports.get = (req,res) =>{
};