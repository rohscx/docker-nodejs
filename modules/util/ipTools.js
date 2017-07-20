const fs = require('fs');
const path = require('path');

fs.writeFileSync("../serverData/test.csv", "Test,Test");
console.log(fs.readfileSync("../serverData/test.csv").toString());

//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html
