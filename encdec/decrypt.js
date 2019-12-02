
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

	encfilename = "gpg_encrypt.pgp";
	const file = fs.readFileSync(encfilename, 'ascii');
	const ciphertext = file;
    options = {
        message: await openpgp.message.readArmored(ciphertext),   // parse armored message
        publicKeys: (await openpgp.key.readArmored(pubkey)).keys, // for verification (optional)
        privateKeys: [privKeyObj]                                 // for decryption
    };

    const decrypted = await openpgp.decrypt(options);
    const plaintext = await openpgp.stream.readToEnd(decrypted.data);
	
	console.log(plaintext)
})();
