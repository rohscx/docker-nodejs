	let dns = require('dns')
  , net = require("net")
  , util = require('util')
  , EventEmitter = require('events');

let ssh = require('ssh2')
  , ciscoclistream = require('ciscocli-stream');

// Export these...
let CISCO_PATTERNS = {
	'PROMPT_USERNAME': /Username:/mi,
	'PROMPT_PASSWORD': /Password:/mi,
	'PROMPT_CLI': /^(.*)([>#])/mi,
	'RANGE_START_RUNNING-CONFIG': /Building configuration.../mi,
	'RANGE_STOP_RUNNING-CONFIG': /end(\r\n|\r\n\r\n)(.*)(>|#)/mi,
	'ERROR_LOGIN_FAILURE': /% (Login Failure|Authentication failed)/mi
};

function CiscoCli(options) {

	this._options = options;
	this._ssh_connection = null;
	this.connection = null;
	this.session = null;
	this.mode = 'unknown';
	this.prompt = '';

	this.REGEX_USERNAME_PROMPT = CISCO_PATTERNS['PROMPT_USERNAME'];
	this.REGEX_PASSWORD_PROMPT = CISCO_PATTERNS['PROMPT_PASSWORD'];
	this.REGEX_PROMPT = CISCO_PATTERNS['PROMPT_CLI'];

}
util.inherits(CiscoCli, EventEmitter);


CiscoCli.prototype.connect = function connect() {
	let self = this;
	if(!self._options.host)
		return self.emit('error', new Error('A `host` option is required for connections.'));

	try {
		self._options.protocol = self._options.protocol.toLowerCase();
		if(['ssh', 'raw'].indexOf(self._options.protocol) == -1) {
			return self.emit('error', new Error('The `protocol` option is required and can be `raw` or `ssh`.'));	
		}
	} catch (err) {
		return self.emit('error', new Error('The `protocol` option is required and can be `raw` or `ssh`.'));	
	}

	function checkPromptAfterLogin(err, regexMatch, remaining) {
		if(err) return;
		self.prompt = regexMatch[0];

		if(regexMatch[2] == '>') {
			self.mode = 'user';

			if(self._options['autoEnable'] == true) {
				let enableCommand = "enable\n";
				if (self._options['enablePassword']) enableCommand += self._options['enablePassword'] + "\n";
				enableCommand += "terminal length 0\n";
				self.ciscocli.send(enableCommand);
				self.ciscocli.match(self.REGEX_PROMPT, checkPromptAfterLogin);
			}

		} else if(regexMatch[2] == '#') {
			self.mode = 'priv';	
			self.emit('ready', self.ciscocli);
		}
	}

	function secureShellHandler(err, stream) {
		if(err) {
			self.emit('error', err)
		} else {
			self.connection = stream;
			self.ciscocli = ciscoclistream.createCiscoCliStream(self.connection, {timeout: 5000});
			self.emit('connect', self.ciscocli);
			self.ciscocli.match(self.REGEX_PROMPT, checkPromptAfterLogin);
		}
	}

	function dnsLookupCallback(err, addresses, family) {
		if(err) return self.emit('error', err);
		let conn;

		if(self._options.protocol == 'ssh') {
			conn = new ssh();
			self._ssh_connection = conn;

			conn.on('ready', function() {
				conn.shell(secureShellHandler);
			}).on('error', function(err){
				self.emit('error', err);
			})

			try {
				conn.connect(self._options);	
			} catch(err) {
				self.emit('error', err);
			}
			

		} else if(self._options.protocol == 'raw') {

			conn = net.createConnection(self._options.port, self._options.host, function() {
				self.connection = conn;
				self.ciscocli = ciscoclistream.createCiscoCliStream(self.connection, {timeout: 5000});
				self.emit('connect', self.ciscocli);

				function doNothing(err, remaining) {}

				self.ciscocli.expect(/% (Login Failure|Authentication failed)/mi, function(err, remaining){
					if(!err) {
						self.connection.end()	
					}
					
				})

				self.ciscocli.respond(self.REGEX_USERNAME_PROMPT, self._options.username + "\n", doNothing);
				self.ciscocli.respond(self.REGEX_PASSWORD_PROMPT, self._options.password + "\n", doNothing);
				self.ciscocli.match(self.REGEX_PROMPT, checkPromptAfterLogin);
			});

			conn.on('error', function(err){
				self.emit('error', err);
			})
		}
	
	}
	dns.lookup(self._options.host, dnsLookupCallback);
}

CiscoCli.prototype.end = function end() {
	this.connection.end();
}

module.exports.CiscoCli = CiscoCli;
module.exports.Patterns = CISCO_PATTERNS;
