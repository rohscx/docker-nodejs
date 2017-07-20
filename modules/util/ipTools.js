const fs = require('fs');
const path = require('path');


//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html

fs.writeFileSync("../serverData/test.csv", "Test,Test");

dataFile = fs.readfileSync("../serverData/test.csv").toString();

console.log(fs.readfileSync("../serverData/test.csv").toString());
