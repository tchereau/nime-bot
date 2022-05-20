//const { getRandomInt } = require("../utils/random");
import { getRandomInt } from "../utils/random.js";
//const crypto = require('crypto');
import cryto from "crypto";
const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
export const fakeToken = (argsBody) =>{
    let fakeUserID  = getRandomInt(100000000000000000,999999999999999999);
    let buffUserID = new Buffer.from(fakeUserID.toString());
    let fakeUserIDBase64 = buffUserID.toString('base64');

    timestamp = Math.round(+new Date() / 1000) - 1293840000;

    const digit = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
    toB64 = x=>x.toString(2).split(/(?=(?:.{6})+(?!.))/g).map(v=>digit[parseInt(v,2)]).join("")
    let fakeTimestampBase64 = toB64(timestamp)
    //console.log(fakeTimestampBase64)
    //console.log(fakeUserIDBase64)
    let hmac = crypto.createHmac('sha256', atob('lol')).update(makeid(5)).digest('base64')
    hmac = hmac.slice(0,(hmac.length - 1))
    //console.log(fakeUserIDBase64 + '.' + fakeTimestampBase64 + '.' + hmac)
    argsBody.message.channel.send({
        content: 'Voici le token ```' + fakeUserIDBase64 + '.' + fakeTimestampBase64 + '.' + hmac + '```',
      })
        //.then(console.log)
        .catch(console.error);
}
export const fakeTokenLog = () =>{
    let fakeUserID  = getRandomInt(100000000000000000,999999999999999999);
    let buffUserID = new Buffer.from(fakeUserID.toString());
    let fakeUserIDBase64 = buffUserID.toString('base64');

    timestamp = Math.round(+new Date() / 1000) - 1293840000;

    const digit = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";
    toB64 = x=>x.toString(2).split(/(?=(?:.{6})+(?!.))/g).map(v=>digit[parseInt(v,2)]).join("")
    let fakeTimestampBase64 = toB64(timestamp)
    //console.log(fakeTimestampBase64)
    //console.log(fakeUserIDBase64)
    let hmac = crypto.createHmac('sha256', atob('lol')).update(makeid(5)).digest('base64')
    hmac = hmac.slice(0,(hmac.length - 1))
    return (fakeUserIDBase64 + '.' + fakeTimestampBase64 + '.' + hmac);
}
/* module.exports = {
    fakeToken, fakeTokenLog
} */
/* export default { fakeToken, fakeTokenLog } */