var
  fs = require('fs'),
  sys = require('sys'),
  assert = require('assert');

var crypto_extras = require('crypto-extras');

var plaintext = "The Plaintext";

// Test RSA routines - keypair:
var rsaPublic = fs.readFileSync("rsa.public", 'ascii');
var rsaPrivate = fs.readFileSync("rsa.private", 'ascii');

var params = { publicKey: rsaPublic, privateKey: rsaPrivate, passphrase: "foobar" };
var keypair = crypto_extras.createRsaKeypair(params);

// roundtrip via hex encoding
var ciphertext = keypair.encrypt(plaintext, 'utf8', 'hex');
var plaintext_again = keypair.decrypt(ciphertext, 'hex', 'utf8');
assert.equal(plaintext, plaintext_again);

//keypair.decrypt(plaintext, 'hex', 'utf8');
//crypto_extras.randomBytes(64, 'foo');
//keypair.encrypt(plaintext, 'utf8', 'foo');
//keypair.decrypt(ciphertext, 'foo', 'utf8');
