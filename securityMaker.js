
const securityFile = require('./modules/securityFile')

const rl = require('readline');
const program = require('commander');


/* These can be broken up into speperate .js files to accomplish a task
   ultimately some user interaction front end should be build, but this is a
   quick ad dirty....
   Note to self 240 characters can hold about 8 ip RANGES. <-- Batch Maximum!!
*/
let secFileExtension = ".js";
let secFileName = "securityFile";
let secFileData = securityFile.getSecurityFile();
let makeSecurityFile = () => {
  Promise.all([securityFile.setSaveExtentions(secFileExtension),securityFile.writeFile(secFileName,secFileData)])
  .then((fileReturn) => {
    console.log(fileReturn)
  })
  .catch((httpReject) =>{
    console.log(httpReject);
  })
}


program
  .version('0.1.0')
  .usage('<keywords>')
  .option('-S, --securityFile', 'makeSecurityFile')
  .parse(process.argv);

if(!program.args.length) program.help();
if (program.securityFile) console.log(makeSecurityFile());
console.log(program.args);
