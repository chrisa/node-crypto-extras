var
  fs = require('fs'),
  sys = require('sys'),
  assert = require('assert');

var crypto_extras = require('crypto-extras');

var plaintext = "The Plaintext";

// Test RSA routines - keypair:
var rsaPublic = fs.readFileSync("rsa.public", 'ascii');
var rsaPrivate = fs.readFileSync("rsa.private", 'ascii');

// var params = {};
// fs.readFile('rsa.public', 'ascii', function (err, data) {
//     if (err) throw err;
//     var rsaPublic = data;
//     fs.readFile('rsa.private', 'ascii', function (err, data) {
// 	if (err) throw err;
// 	var rsaPrivate = data;
// 	params = { publicKey: rsaPublic, privateKey: rsaPrivate, passphrase: "foobar" };
//     });
// });

var params = { publicKey: rsaPublic, privateKey: rsaPrivate, passphrase: "foobar" };
//sys.puts(sys.inspect(params));

var keypair = crypto_extras.createRsaKeypair(params);

// roundtrip via hex encoding
var ciphertext = keypair.encrypt(plaintext, 'utf8', 'hex');

//sys.puts(ciphertext);

var plaintext_again = keypair.decrypt(ciphertext, 'hex', 'utf8');
assert.equal(plaintext, plaintext_again);

// roundtrip via base64 encoding
var ciphertext = keypair.encrypt(plaintext, 'ascii', 'base64');
var plaintext_again = keypair.decrypt(ciphertext, 'base64', 'ascii');
assert.equal(plaintext, plaintext_again);

// roundtrip via binary
var ciphertext = keypair.encrypt(plaintext, 'utf8', 'binary');
var plaintext_again = keypair.decrypt(ciphertext, 'binary', 'utf8');
assert.equal(plaintext, plaintext_again);

// roundtrip via binary, encryption output encoding unspecified
var ciphertext = keypair.encrypt(plaintext, 'utf8');
var plaintext_again = keypair.decrypt(ciphertext, 'binary', 'utf8');
assert.equal(plaintext, plaintext_again);

// Test random routine
var random_bytes_unspecified = crypto_extras.randomBytes(64);
assert.ok(random_bytes_unspecified);
var random_bytes_binary = crypto_extras.randomBytes(64, 'binary');
assert.ok(random_bytes_binary);
var random_bytes_hex = crypto_extras.randomBytes(64, 'hex');
assert.ok(random_bytes_hex);

// Test RSA-encrypting binary data (like a random key)
var random_key = crypto_extras.randomBytes(64, 'binary');
var encrypted_key = keypair.encrypt(random_key, 'binary', 'binary');
var random_key_again = keypair.decrypt(encrypted_key, 'binary', 'binary');
assert.equal(random_key, random_key_again);

sys.puts("done");
