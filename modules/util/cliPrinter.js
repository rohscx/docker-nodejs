const colors = require('colors');

module.exports = {
  constructor (){
    this.inputFile = {};
  }

  setInputFile(data){
    this.inputFile = data;
  }

  cliPrint(){
    let data = this.inputFile;
    for (let [key, value] of Object.entries(data)) {
      console.log("\n\n",colors.green(key)," :: ", value);
    }
  }

}
