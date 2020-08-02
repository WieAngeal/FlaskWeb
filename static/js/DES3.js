
document.write("<script language='javascript' src='/static/js/crypto/crypto-js.js'></script>");


function des3_decrypt(key_value, data) {
    var key  = CryptoJS.enc.Utf8.parse(key_value); // key
    //const iv = CryptoJS.enc.Utf8.parse("4c43c365"); // iv
    var decrypt_str = CryptoJS.TripleDES.decrypt(data, key, {
        //iv: crypto_iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypt_str.toString(CryptoJS.enc.Utf8);
}

function des3_encrypt(key_value, data){
    var key  = CryptoJS.enc.Utf8.parse(key_value); // key
    //const iv = CryptoJS.enc.Utf8.parse("4c43c365"); // iv
    var encrypt_str = CryptoJS.TripleDES.encrypt(data, key, {
        //iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypt_str.toString(); // 返回加密后的字符串
}

function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = num + "0";
        len++;
    }
    return num;
}