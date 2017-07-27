const cliPrinter = require('./util/cliPrinter');



class cliTools extends cliPrinter {
  constructor (){
    super()
  }


  // Adds a Debugs for the contest of the Ticket POST HTTP request
  debug() {
    console.log("inputFile: "+this.inputFile,'\n')
  }
}

module.exports = new cliTools()
