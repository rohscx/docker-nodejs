var restReqeust = require('./modules/apicTicket');

async function main() {
  var quote = await restReqeust.POST();
  console.log(quote);
}

  
//console.log(test) // REST POST


main();
console.log('Ron once said,');
