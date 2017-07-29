const colors = require('colors');

module.exports = class cliPrinter {
  constructor (){
    this.inputFile = {};
  }

  setInputFile(data){
    this.inputFile = data;
  }

  cliPrint(keyColor,valueColor){
    colors.setTheme({
      key: keyColor
      value: valueColor ? valueColor : "black"
    });
    let inputFile = this.inputFile;
    inputFile.map((data) =>{
      for (let [key, value] of Object.entries(data)) {
        console.log(keyColor.data(key)," :: ",valueColor.data(value));
      }
      console.log("\n\n")
    })
  }

}
