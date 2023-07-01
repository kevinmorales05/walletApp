import CryptoJS from 'crypto-js';

//environmet variables
//const consumerKey: string = 'lJb8nqGOFvAXwwLEm4cgvcA9OyQa';
//const tenant_name: string = 't/liverpool.com';

export function cryptoSignature(token: string, url: string) {
  //environmet variables
  const consumerKey: string = 'lJb8nqGOFvAXwwLEm4cgvcA9OyQa';
  const tenant_name: string = 't/liverpool.com';
  // Init
  let mgtw = 'https://aurumcore.cospace.cloud:9095';
  var targetUrl = url.trim();
  targetUrl =
    '/' +
    tenant_name +
    targetUrl.replace(new RegExp(`^${mgtw}/${tenant_name}`), '');
  let contentType = 'application/json';
  //configuration
  let config = {
    algorithm: 'hmac-sha256',
    secretkey: consumerKey,
    params: [targetUrl, contentType, token],
  };

  const newSignature = computeHttpSignature(config);
  return newSignature;
}

function computeHttpSignature(config: any) {
  let template =
      'keyId="${keyId}",algorithm="${algorithm}",headers="${headers}",signature="${signature}"',
    sig = template;

  // compute sig here
  let signingBase = '';
  config.params.forEach(function (param: any) {
    signingBase += param + ';';
  });

  signingBase = signingBase.substring(0, signingBase.length - 1);

  let key = CryptoJS.enc.Utf8.parse(config.secretkey);
  let msg = CryptoJS.enc.Utf8.parse(signingBase);
  let encoded = CryptoJS.enc.Base64.stringify(CryptoJS.HmacSHA256(msg, key));
  console.log('signature ', encoded);
  return encoded;
}
