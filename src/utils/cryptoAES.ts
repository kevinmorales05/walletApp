import CryptoJS from 'crypto-js';

const cryptoAES = (msg: string, secret: string): string => {
  // You can test cryptoAES, please only uncomment these lines of code.
  // secret = 'dishelt.torres.paz.101:pgRSwptlOM9KYf0gtCT9bBTYllwa';
  // secret = 'pgRSwptlOM9KYf0gtCT9bBTYllwa';
  // msg = 'Admin.123';
  console.log('msg =======================> ', msg);
  console.log('secret =============================> ', secret);

  const hashedSecret = CryptoJS.SHA1(CryptoJS.enc.Utf8.parse(secret));
  const key = CryptoJS.enc.Hex.parse(
    hashedSecret.toString(CryptoJS.enc.Hex).substr(0, 32),
  );

  const encryptor = CryptoJS.AES.encrypt(msg, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  const ciphermsg = encryptor.ciphertext.toString(CryptoJS.enc.Base64);
  console.log(
    'msgHashed ===============================================> ',
    ciphermsg,
  );
  return ciphermsg;
};

export default cryptoAES;

// The following commented region code is the Original JAVA implementation.
// You can run it and you will get the same result as with the above code.

// import java.io.UnsupportedEncodingException;
// import java.nio.charset.StandardCharsets;
// import java.security.InvalidKeyException;
// import java.security.MessageDigest;
// import java.security.NoSuchAlgorithmException;
// import java.util.Arrays;
// import java.util.Base64;
// import java.util.regex.Pattern;
// import javax.crypto.BadPaddingException;
// import javax.crypto.Cipher;
// import javax.crypto.IllegalBlockSizeException;
// import javax.crypto.NoSuchPaddingException;
// import javax.crypto.spec.SecretKeySpec;

// public class AESEncryption
// {
//     // Esta opcion se usa para cifrar la contraseña para el login con usuario y contraseña (grant_type: password)
//     // Esta opcion se usa para cifrar la contraseña para el pre-registro ({{mgtw_url}}/onboarding/1.0.0/register/create):
//     public static final String IDENTIFIER_KEY = "pgRSwptlOM9KYf0gtCT9bBTYllwa";
//     public static final String IDENTIFIER_KEY_BRANCH = "l1v3rp00l";

//     private static AESEncryption instance = null;

//     public static synchronized AESEncryption getInstance()
//     {
//         if (instance == null) instance = new AESEncryption();
//         return instance;
//     }

//     private static SecretKeySpec createKey(String key) throws UnsupportedEncodingException, NoSuchAlgorithmException
//     {
//         byte[] encryptKey = key.getBytes(StandardCharsets.UTF_8);
//         MessageDigest sha = MessageDigest.getInstance("SHA-1");
//         encryptKey = sha.digest(encryptKey);
//         encryptKey = Arrays.copyOf(encryptKey, 16);
//         SecretKeySpec secretKey = new SecretKeySpec(encryptKey, "AES");
//         return secretKey;
//     }

//     public synchronized String encrypt(String data, String key) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException
//     {
//         SecretKeySpec secretKey = createKey(key);
//         Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
//         cipher.init(Cipher.ENCRYPT_MODE, secretKey);
//         byte[] encryptData = data.getBytes(StandardCharsets.UTF_8);
//         byte[] encryptedByte = cipher.doFinal(encryptData);
//         String encrypted = Base64.getEncoder().encodeToString(encryptedByte);
//         return encrypted;
//     }

//     public synchronized String desencrypt(String data, String key) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException
//     {
//         SecretKeySpec secretKey = createKey(key);
//         Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5PADDING");
//         cipher.init(Cipher.DECRYPT_MODE, secretKey);
//         byte[] encryptedByte = Base64.getDecoder().decode(data);
//         byte[] dataDescencrypted = cipher.doFinal(encryptedByte);
//         String result = new String(dataDescencrypted); return result;
//     }

//     public static void main(String[] args) throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException
//     {
//         // Pattern textPattern = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9@$!%*?&.:,;]{8,}$");
//         String pass = "Admin.123";
//         String email = "mariano.martinez";
//         String encryptToRegister = AESEncryption.getInstance().encrypt(pass, IDENTIFIER_KEY);
//         String desencryptToRegister = AESEncryption.getInstance().desencrypt(encryptToRegister, IDENTIFIER_KEY);
//         String encryptForCommonLogin = AESEncryption.getInstance().encrypt(pass, email + ":" + IDENTIFIER_KEY_BRANCH);
//         String desEncryptForCommonLogin = AESEncryption.getInstance().desencrypt(encryptForCommonLogin, email + ":" + IDENTIFIER_KEY_BRANCH);

//         System.out.println("pass: " + pass);
//         System.out.println("email sin dominio: " + email);
//         System.out.println("encryptToRegister: " + encryptToRegister);
//         System.out.println("desencryptToRegister: " + desencryptToRegister);
//         System.out.println("encryptForCommonLogin: " + encryptForCommonLogin);
//         System.out.println("desEncryptForCommonLogin: " + desEncryptForCommonLogin);

//         //System.out.println("Valid pass: " + textPattern.matcher(pass).matches());
//     }
// }
