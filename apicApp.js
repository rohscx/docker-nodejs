var restReqeust = require('./modules/apicTicket');
var test = restReqeust.POST()
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    // Deal with the error
  })
  
console.log(test) // REST POST
