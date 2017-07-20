const fs = require('fs');
const path = require('path');

//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html

module.exports = {

  writeFile: () =>{
    fs.writeFileSync("../serverData/ipList.csv", "Test,Test");
    console.log()
  }

  readFile () =>{
    return fs.readfileSync("../serverData/ipList.csv").toString();
  }

}
