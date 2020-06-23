const db = require('../../db');

/**
 *
 * @param dbMethod
 * @param paramsdbMethod
 * @param params3
 * @returns {Promise<void>}
 */
const retrieveDb = async (dbMethod = '', paramsdbMethod = null, params3 = null) => {
  if (dbMethod !== "") {
    if (paramsdbMethod === null) {
      return await eval('db.' + dbMethod + '()');
    }
    else {
      if (params3 === null) {
        return await eval(`db.${dbMethod}(paramsdbMethod)`);
      }
      else {
        return await eval(`db.${dbMethod}(paramsdbMethod,params3)`);
      }
    }
  }
  else {
    throw new Error('[retriveDB] dbMethod must not be null !');
  }

};


module.exports = {
  retrieveDb
};
