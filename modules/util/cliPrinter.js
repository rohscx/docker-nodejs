const colors = require('colors');

module.exports = class cliPrinter {
  constructor (){
    this.inputFile = {};
  }

  setInputFile(data){
    this.inputFile = data;
  }

  cliPrint(color){
    colors.setTheme({
      data: color
    });
    let inputFile = this.inputFile;
    inputFile.map((data) =>{
      for (let [key, value] of Object.entries(data)) {
        console.log(colors.data(key)," :: ", value);
      }
      console.log("\n\n")
    })
  }

}
