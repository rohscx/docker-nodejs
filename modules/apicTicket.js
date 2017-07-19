var rest = require('./api/rest');
module.exports = () => {
  var newRest = rest();
  var output = newRest.anotherTestResponse;
  return (
    {testResponse: "Cats on everything from Apic Ticket",
      gostface: output
    }
    test
  );
}
