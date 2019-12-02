//const readableStream = require('readableStream');
const openpgp = require('openpgp')
const path = require('path');
var fs = require('fs');

(async () => {
    let options;

	const pubkey  = fs.readFileSync('test_public.key', 'ascii');
	const privkey = fs.readFileSync('test_private.key', 'ascii');
	const passphrase = `Finasist_Uno`; 

	const privKeyObj = (await openpgp.key.readArmored(privkey)).keys[0];
	await privKeyObj.decrypt(passphrase);

	infilename = "GLsacfmex.20190614120405.xml";
	const file = fs.readFileSync(infilename, 'ascii');
//	console.log(file);
const readableStream = file;
	//console.log(readableStream);
	
    options = {
        message: openpgp.message.fromText(readableStream),        // input as Message object
        publicKeys: (await openpgp.key.readArmored(pubkey)).keys, // for encryption
        privateKeys: [privKeyObj]                                 // for signing (optional)
    };

    const encrypted = await openpgp.encrypt(options);
    const ciphertext = encrypted.data; // ReadableStream containing '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'
	
	const writeenc = fs.writeFileSync('33.pgp',ciphertext);
//	console.log(ciphertext);

    options = {
        message: await openpgp.message.readArmored(ciphertext),   // parse armored message
        publicKeys: (await openpgp.key.readArmored(pubkey)).keys, // for verification (optional)
        privateKeys: [privKeyObj]                                 // for decryption
    };

    const decrypted = await openpgp.decrypt(options);
    const plaintext = await openpgp.stream.readToEnd(decrypted.data); // 'Hello, World!'
	
//	console.log(plaintext)
})();
