const fs = require('fs');
const path = require('path');

//path.normalize(): example /opt/datafiles/about.html
//path.dirname();  example /opt/datafiles
//path.basename(); example about.html
//path.extname(); example .html

module.exports = {

  writeFile: () =>{
    fs.writeFileSync("/home/node_dev/nodeProjects/docker-nodejs/serverData/ipList.csv", "Test,Test");
    console.log()
  },
  readFile: () =>{
    return fs.readFileSync("/home/node_dev/nodeProjects/docker-nodejs/serverData/ipList.csv").toString();
  },
  formatData: (data) =>{
    let newData = data.split("\n");
    let fixup = newData.map((data) =>{
      let octants = data.split(".");
      console.log(octants);
      console.log(octants.length);
      console.log(octants[3]);
      for (i = 0 ; i < octants.length; i++) {
        if (i == 3) {
          console.log(octants[i]);
          if (octants[i] == 230) {
            expandBy = 10;
            expandRange = 230 + expandBy;
            createRange = octants[0]+"."+octants[1]+"."+octants[2]+"."+expandRange;
            console.log(createRange);
          }
        }
      }})
    console.log(newData);
  }

}
