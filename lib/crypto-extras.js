var sys = require('sys');

// load core crypto to get OpenSSL initialized
var crypto = require('crypto');

try {
    var binding = require('./cryptoExtrasBindings');
    var RsaKeypair = binding.RsaKeypair;
    var Random = binding.Random;
    var crypto_extras = true;
} catch (e) {
    sys.puts(e);
    var crypto_extras = false;
}

exports.RsaKeypair = RsaKeypair;
exports.createRsaKeypair = function(keys) {
    var k = new RsaKeypair();

    if (keys.publicKey) {
	k.setPublicKey(keys.publicKey);
    }
    
    if (keys.privateKey) {
	if (keys.passphrase) {
	    k.setPrivateKey(keys.privateKey, keys.passphrase);
	}
	else {
	    k.setPrivateKey(keys.privateKey);
	}
    }

    return k;
}

exports.Random = Random;
exports.randomBytes = function(count, encoding) {
    return (new Random).randomBytes(count, encoding);
}
