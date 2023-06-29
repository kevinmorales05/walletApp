import CryptoJS from 'crypto-js';

const consumer_key = 'lJb8nqGOFvAXwwLEm4cgvcA9OyQa';

const cryptoAESauth = (plaintextPassword: string): any => {
  let preEncypted = CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(consumer_key));
  let newKey = CryptoJS.enc.Hex.parse(
    preEncypted.toString(CryptoJS.enc.Hex).substr(0, 32),
  );
  var encrypted = CryptoJS.AES.encrypt(plaintextPassword, newKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted;
};

export default cryptoAESauth;
