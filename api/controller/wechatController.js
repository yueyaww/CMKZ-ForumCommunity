const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const forge = require('node-forge');
const path = require('path');

const config = {
  mchid: '1700361677', // 替换为你的商户号
  appid: 'wxe724093c14513196', // 替换为你的appid
  apiV3Key: '45854273260358674283855867428385', // 替换为你的APIv3密钥
  serialNo: '6D1FF0D3CAEEC170E8CD4A96A3CDC110507ED021', // 替换为你的证书序列号
  privateKey: fs.readFileSync(path.join(__dirname, 'key.pem')), // 替换为你的私钥文件路径
};

function generateSignature(method, url, body, timestamp, nonce) {
  const message = `${method}\n${url}\n${timestamp}\n${nonce}\n${body}\n`;
  const signer = crypto.createSign('RSA-SHA256');
  signer.update(message);
  return signer.sign(config.privateKey, 'base64');
}

// 生成随机字符串
function generateNonceStr() {
  return crypto.randomBytes(16).toString('hex');
}

exports.get = async (req, res) =>{
	const out_trade_no = new Date().getTime().toString();
	const total = parseInt(req.query.total);
	const method = 'POST';
	  const url = '/v3/pay/transactions/native';
	  const timestamp = Math.floor(Date.now() / 1000).toString();
	  const nonce = crypto.randomBytes(16).toString('hex');
	  const body = JSON.stringify({
	    mchid: config.mchid,
	    appid: config.appid,
	    description: '支付',
	    out_trade_no,
	    notify_url: 'http://yuntuanai.top/notify',
	    amount: {
	      total,
	      currency: 'CNY',
	    },
	  });
	
	  // 生成签名
	  const signature = generateSignature(method, url, body, timestamp, nonce);
	
	  // 构造请求头
	  const headers = {
	    'Authorization': `WECHATPAY2-SHA256-RSA2048 mchid="${config.mchid}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${config.serialNo}"`,
	    'Content-Type': 'application/json',
	  };
		
		try {
		    // 调用微信支付 APIv3 统一下单接口
			const response = await axios.post(`https://api.mch.weixin.qq.com${url}`, body, { headers });
			res.json({
				code_url: response.data.code_url,
				out_trade_no,
				status: 200
			});
		} catch (error) {
			console.log(error);
			res.json({
				status: 500,
				error: '生成支付链接失败'
			});
		}
};

exports.queryOrder = async (req, res) =>{
		const { outTradeNo } = req.query;
	
	  const method = 'GET';
	  const url = `/v3/pay/transactions/out-trade-no/${outTradeNo}?mchid=${config.mchid}`;
	  const timestamp = Math.floor(Date.now() / 1000).toString();
	  const nonce = generateNonceStr();
	  const body = ''; // GET 请求没有请求体
	
	  // 生成签名
	  const signature = generateSignature(method, url, body, timestamp, nonce, config.privateKey);
	
	  // 构造请求头
	  const headers = {
	    Authorization: `WECHATPAY2-SHA256-RSA2048 mchid="${config.mchid}",nonce_str="${nonce}",signature="${signature}",timestamp="${timestamp}",serial_no="${config.serialNo}"`,
	    'Content-Type': 'application/json',
	  };
	
	  try {
	    // 调用微信支付 APIv3 查询订单接口
	    const response = await axios.get(`https://api.mch.weixin.qq.com${url}`, { headers });
			res.json({
				status: 200,
				data: response.data
			});
	  } catch (error) {
			console.log(error);
			res.json({
				status: 500,
				error: '查询订单状态失败'
			});
	  }
}