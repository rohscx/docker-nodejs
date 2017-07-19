var Rest = require('./api/rest');

class restReqeust extends Rest {
contructor(uri,method,body) {
this.uri=uri;
this.method=method;
this.body=body;
}
}

module.exports = new restReqeust()
