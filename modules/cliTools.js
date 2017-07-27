const rest = require('./api/cliPrinter');



class cliTools extends cliPrinter {
  constructor (method,uri,rejectCert,headers,body){
    super(method,uri,rejectCert,headers,body)
    this.ticket = "";
    this.uriBase = uriBase;
  }


  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("inputFile: "+this.inputFile,'\n')
  }
}

module.exports = new cliTools()
