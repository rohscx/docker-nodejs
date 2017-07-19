var Rest = require('./api/rest');

class restReqeust extends Rest {
contructor(uri,method,body) {
  super(uri,method,body);
}
}

module.exports = new restReqeust()
