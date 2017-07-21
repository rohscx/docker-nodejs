module.exports = new ipTools(inputFile,outputFile)






module.exports = {

  writeFile: (fileName) =>{
    let newFile = fileName+".csv";
    fs.writeFileSync("/home/node_dev/nodeProjects/docker-nodejs/serverData/ipList.csv", newFile);
    console.log()
  },
  readFile: () =>{
    return fs.readFileSync("/home/node_dev/nodeProjects/docker-nodejs/serverData/ipList.csv").toString();
  },

}
