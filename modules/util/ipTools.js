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
  formatData: (data, expandBy) =>{
    let ipRange = [];
    let badData = [];
    let skipped = [];
    let newData = data.split("\n");
    let fixup = newData.map((data) =>{
      let octants = data.split(".");
      // debug
      /*
      console.log(octants);
      console.log(octants.length);
      console.log(octants[3]);
      */
      for (i = 0 ; i < octants.length; i++) {
        // side effect is that this standardises the data to proper IP's only..
        if (i == 3) {
          // debug
          /*
          console.log(octants[i]);
          */
          if (octants[i] == 230) {
            incrementBy = expandBy;
            // Converts string value to int and add the values
            newOctant = Number(octants[i]) + incrementBy;
            // Creates
            createIP = octants[0]+"."+octants[1]+"."+octants[2]+"."+newOctant;
            newRange = data+"-"+createIP;
            // debug
            /*
            console.log(createIP);
            console.log(newRange);
            */
            ipRange.push(newRange);
            // Checks for IP address outside of the normal range
          } else if (octants[i] <= 229 || octants[i] >= 241) {
            newRange = data+"-"+data
          } else {
            // Just in case catch the rest
            let dataIndex = newData.indexOf(data) + 1;
            skipped.push(data+"  <- index -("+dataIndex+")");
          }
        } else if (octants.length <= 3 || octants.length >= 5) {
          badData.push(data+"  <- index -("+newData.indexOf(data)+")");
        }
      }})
      // debug
      /*
      console.log(newData);
      console.log(ipRange)
      */
      // If data Does not match the length requirement it is considered bad data!
      if (badData.length != 0) {
        console.log("badData  ===>>  ",badData,"  <<===");
      } else {
        console.log("No badData. DataSet appears to be clean!!!");
      }
      if (skipped.length != 0) {
        console.log("skipped  ===>>  ",skipped,"  <<===");
      } else {
        console.log("Nothing skipped. DataSet appears to be clean!!!");
      }
      return ipRange;
  }
}
