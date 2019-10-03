const { to } = require('await-to-js');
const pe = require('parse-error');

module.exports.to = async (promise) => {
  let err, res;
  [err, res] = await to(promise);
  if (err) {
    return [pe(err)];
  }

  return [null, res];
};

module.exports.ReE = (req, err, code) => {
  if (typeof err == 'obejct' && typeof err.message != 'undefined' ) {
    err = err.message;
  }

  if (typeof code !== 'undefined') {
    res.statusCode = code;
  }

  return res.json({ success: false, error: err });
};

module.exports.Res = (res, data, code) => {
  let sendData = { success: true };

  if (typeof data == 'object') {
    // Merge the objects
    sendData = Object.assign(data, sendData);
  }

  if (typeof code !== 'undifined') {
    res.statusCode = code;
  }

  return res.json(sendData);
};

module.exports.TE = TE = (errMessage, log) => {
  if (log === true) {
    console.log(errMessage)
  }

  throw new Error(errMessage);
};