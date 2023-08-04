// 引入RSA加密文件
import JSEncrypt from 'jsencrypt'
// 引入AES加密
import CryptoJS from 'crypto-js'
import hexMD5 from './md5.js'

// 设置私钥
// var decrypt = new JSEncrypt();
// const provateKey = `MIICXwIBAAKBgQDIuKMKAi4wWhQtjvF2gjo7+eHDuP3IFYOzYc+o+mpo3PX5+ZOauPXdJ0HopK9/QOWpQ2FF3ZMJZx4+Puc4CfCIHXtU2+X08zZumMhfs80qfmMKFvy3SnIM8SCUopAStzsVLY9f0Egmr7jShcdIxyUlRY4vPXuAEB1vRI3daSH0SQIDAQABAoGBAL15leZ3wnRARDXxbryJGEHPk6+3rFE5BfbKiUWhBdvxYX1UfGKc4PKgAVaER2pfr6xFf8h87jT9E458wLWkpFmcjhTXi01cJGrhhkmmMpg9knkEuWH3SmuSB7Wb67dvC1+WeO1LBk5TeUSdbQX3k+jvyR4xm0Or5cCZqvU42kWBAkEA8GRR1+OFroU2ARL2ze6I2JmBKKVF02jQjLazD7pJTBg1y4REDmqYvqmaxPmOv1NlRRGzR5IHGsiHEitkKTTT+QJBANXA7jpJoUug6Kd2IlzsnLCFw4MxjnyGkcuhu9pLKj/rV3HdeZ3XX/ooExufa5y18+CuWQQWSD6fd+WZ2XB1ltECQQCZKKGIdhqnHZJRzt5WSEMCFZNX7Sz2zBILhR/CxoKKq+YiW4vsz3ewCmlkVEfhmGWuQt/BmsVSCC8eoWy4YEMpAkEAitQspdTOmrUehi028k2HEys9qYbVOVGZfb1EqenpvewXNlAXPgn1Px8qEeW/2d9fTw1NqVbjgzDFiW0cCWuGEQJBALpvGJz3DCU+2HjSgf+aDGbcIw/f8f8QUVEvuxgvkCb/K4eu9KmzlgaLTrQJaloqOI3cJsUdsF0xvdWccfD4aTo=`
// decrypt.setPrivateKey(provateKey);

// let jiemihou = decrypt.decrypt(jiamihou);
// console.log(jiemihou, '解密后')

// 加密
function Encrypt(str, secretKey) {
  let key = CryptoJS.enc.Utf8.parse(secretKey); // 密钥：一个常量，前后端协定后一个字符串即可
  // let iv = CryptoJS.enc.Utf8.parse('0123456789ABCDEF'); // 偏移量：一个常量，前后端协定后一个字符串，前后端一致即可

  let srcs = CryptoJS.enc.Utf8.parse(str);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    // iv: iv,
    mode: CryptoJS.mode.ECB,  // mode 与后台一致。有多个模式可选
    padding: CryptoJS.pad.Pkcs7, //
  });

  // 需要返回base64格式的加密结果，使用此句
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

  // 需要返回hex格式的加密结果，使用此句
  // return encrypted.ciphertext.toString().toUpperCase();
}

// 解密
function Decrypt(str, secretKey) {
  let key = CryptoJS.enc.Utf8.parse(secretKey); // 密钥：一个常量，前后端协定后一个字符串即可
  // let iv = CryptoJS.enc.Utf8.parse('0123456789ABCDEF'); // 偏移量：一个常量，前后端协定后一个字符串，前后端一致即可

  let base64 = CryptoJS.enc.Base64.parse(str);
  let src = CryptoJS.enc.Base64.stringify(base64);

  var decrypt = CryptoJS.AES.decrypt(src, key, {
    // iv: iv,
    // mode: CryptoJS.mode.ECB,
    mode: CryptoJS.mode.ECB, // mode 与后台一致。有多个模式可选
    padding: CryptoJS.pad.Pkcs7
  });

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

export const encryption = function(params, token) {
  console.log('params', params)
  // AES密钥
  let secretKey = ''
  const arr = 'qwertyuiopasdfghjklzxcvbnm1234567890'
  for(let i = 0; i < 16; i++) {
    secretKey += Array.from(arr)[Math.floor(Math.random() * arr.length) ]
  }
  // 添加token ticket
  params.token = token
  // 添加时间戳
  params.timestamp = new Date().getTime() + ""

  let sortParams = {};
  // 排序
  let keys = Object.keys(params).sort()
  for (let i = 0, len = keys.length; i < len; i++) {
    sortParams[keys[i]] = params[keys[i]]
  }
  console.log('JSON.stringify(sortParams)', JSON.stringify(sortParams))
  // 添加sign(MD5加密排序后参数)
  sortParams.sign = hexMD5(JSON.stringify(sortParams))
  // 使用AES密钥加密业务JSON,得到密文C
  const C = Encrypt(JSON.stringify(sortParams), secretKey)
  // 用RSA公钥加密AES密钥，得到accesskey
  const jsRsa = new JSEncrypt();
  // 设置公钥
  const publickKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKA4hrLHJN1bYJFmpmto-kx_EYgxgFeQJcLwcFivItpV9JcyCJ2p-z31_rvy9xLdAwQaNcNUugKbc19iYghJ1GsCAwEAAQ`
  jsRsa.setPublicKey(publickKey);
// 对字符串进行加密
  return {
    content: C,
    aesKey: jsRsa.encrypt(secretKey)
  };
}
















