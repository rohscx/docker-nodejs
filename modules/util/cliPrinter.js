const colors = require('colors');

module.exports = class cliPrinter {
  constructor (){
    this.inputFile = {};
  }

  setInputFile(data){
    this.inputFile = data;
  }

  cliPrint(keyColor,valueColor){
    let kColor = keyColor ? keyColor : "red";
    let vColor = valueColor ? valueColor : "black";

    colors.setTheme({
      key: kColor
      value: vColor
    });
    let inputFile = this.inputFile;
    inputFile.map((data) =>{
      for (let [key, value] of Object.entries(data)) {
        console.log(colors.key(key)," :: ",colors.value(value));
      }
      console.log("\n\n")
    })
  }

}
