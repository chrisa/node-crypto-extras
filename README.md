`node-crypto-extras`

This module provides access to extra crypto routines from OpenSSL:

  * RSA public-key encrypt/decrypt operations
  * Access to the OpenSSL RNG

RSA is limited to RSAES-OAEP and encryption with a public key,
decryption with a private key. 

### Build

With `node` in your path:

   $ ls
   Makefile       build           rsa.private     src
   README         lib             rsa.public      test
   $ make

### Install

Either copy build/default/cryptoExtrasBindings.node and
lib/crypto-extras.js to a location node.js will look in, or add the
directories to your NODE_PATH:

   $ NODE_PATH=node-crypto-extras/build/default:node-crypto-extras/lib node ...

### Usage

See test/test.js.

### Licence

BSD, see LICENCE.
