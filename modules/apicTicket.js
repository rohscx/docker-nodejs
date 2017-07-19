var Rest = require('./api/rest');

class restReqeust extends Rest {

  p = new Rest(uri,method,body);
}

module.exports = new restReqeust()
