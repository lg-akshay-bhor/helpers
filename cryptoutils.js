var cryptoUtils = require('crypto');
var config = require('../../config');

/**
 * Function to encrypt a string.
 *
 * @method encrypt
 * @param {Object} phrase String to be encrypted
 * @return {Object} encryptedPhrase String response back to client
 */
function encrypt(phrase) {
    //console.log("Input before encryption To do remove this log before prod" + phrase);
    const iVector = initializationVector();
    const secretKey = config.CRYPTO_ENCRYPTION_KEY; // To do - Externalize with Secrets Manager LG-11
    const encryptedPhrase = encryptPhrase(phrase, iVector, secretKey); 
    //console.log("Output after encryption" + encryptedPhrase);
    return encryptedPhrase;
} 

/**
 * Function to decrypt an encryptedstring.
 *
 * @method decrypt
 * @param {Object} encryptedPhrase String to be decrypted
 * @return {Object} phrase String response back to client
 */
function decrypt(encryptedPhrase) {
  //console.log("Input before decryption " + encryptedPhrase);
  const iVector = initializationVector();
  const secretKey = config.CRYPTO_ENCRYPTION_KEY; // To do - Externalize with Secrets Manager LG-11
  const phrase = decryptPhrase(encryptedPhrase, iVector, secretKey); 
  //console.log("Output after decryption" + phrase);
  return phrase;
} 

/**
 * Function to create hash for the input string.
 *
 * @method createHash
 * @param {Object} phrase input String to be hashed
 * @return {Object} hashOutput Returns response back to client
 */
function createHash(phrase, hashSecretKey) {
  const secretKey = config.CRYPTO_HASHING_KEY; // To do - Externalize with Secrets Manager LG-11
  const hashOutput = hashPhrase(phrase, secretKey); 
  //console.log("Output after hashing" + hashOutput);
  return hashOutput;  
}

function initializationVector() {
  resizedIV = Buffer.allocUnsafe(16),
  iv = cryptoUtils
    .createHash("sha256")
    .update(config.CRYPTO_IV)
    .digest();

  const ivector = iv.copy(resizedIV);
  //console.log("resizedIV " + resizedIV);
  //console.log("iv " + iv);
  //console.log("ivector " + ivector);
  return resizedIV;
}

function encryptPhrase(phrase, resizedIV, secretKey) {
  const key = cryptoUtils
  .createHash("sha256")
  .update(secretKey) 
  .digest(),
  cipher = cryptoUtils.createCipheriv("aes256", key, resizedIV),
  msg = [];
  //console.log("key " + key);
  msg.push(cipher.update(phrase, "binary", "hex"));
  msg.push(cipher.final("hex"));
  //console.log("Encrypted Value =" + msg.join(""));
  return msg.join("");
}

function decryptPhrase(encryptedPhrase, resizedIV, secretKey) {
  const key = cryptoUtils
  .createHash("sha256")
  .update(secretKey) 
  .digest(),
  decipher = cryptoUtils.createDecipheriv("aes256", key, resizedIV),
  msg = [];
  //console.log("key " + key);
  msg.push(decipher.update(encryptedPhrase, "hex", "binary"));
  msg.push(decipher.final("binary"));
  //console.log("Decrypted Value =" + msg.join(""));
  return msg.join("");
}

function hashPhrase(phrase, hashSecretKey) {
  const hashOutput = cryptoUtils.createHmac('sha256', hashSecretKey)
                     .update(phrase) //string to be hashed
                     .digest('hex');
  //console.log("SSN Hash for 222333311123 is " + hashOutput);
  return hashOutput;
}

// Export below functions to be used by other files/routes
module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  createHash: createHash 
};