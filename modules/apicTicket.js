var Calculator  = require('./api/rest');

class AdvancedCalculator extends Calculator {
  multiply(a,b) { return a * b }
  divide(a,b) { return a / b }
}


module.exports = new AdvancedCalculator()
