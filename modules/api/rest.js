var request = require('request');
var formData = require('form-data');

module.exports = class Calculator {
  add(a,b) { return a + b }
  substract(a,b) { return a - b }
}
