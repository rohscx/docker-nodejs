var restReqeust = require('./modules/apicTicket');
var test = restReqeust.POST(function (err, data) {
  if (err) return console.error(err)
  console.log(data)
});
  
//console.log(test) // REST POST
