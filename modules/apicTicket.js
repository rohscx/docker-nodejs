var Rest = require('./api/rest');

class restReqeust extends Rest {
  let uri = "https://devnetapi.cisco.com/sandbox/apic_em/api/v1/ticket";
  let method = "POST";
  let body = {
    "username":"devnetuser",
    "password":"Cisco123!"
  };

  p = new Rest(uri,method,body);
}

module.exports = new restReqeust()
