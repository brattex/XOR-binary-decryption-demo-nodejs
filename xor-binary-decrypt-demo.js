/*
		Takes a hard-coded binary string, XOR with private key and outputs the plaintext.

		Useful website verification / sanity check tool: https://md5decrypt.net/en/Xor/

*/

function xorDecryptFromBinary(binarySequence, key) {
	// set a blank string for the starting text
	let decryptedText = '';

	console.log("Converting each 8-bit binary chunk into a decimal number for XOR...");

	for (let i = 0; i < binarySequence.length; i += 8) {
		// Convert each 8-bit chunk to a decimal number
		const binaryChunk = binarySequence.substring(i, i + 8);
		
		// Parse string chunk as base 2, and return integer representation into decimalValue
		const decimalValue = parseInt(binaryChunk, 2);

		/* 	
				XOR each decimal value with the corresponding character from the key:

				1. create a string from a sequence of Unicode values:
				2. decimalValue bitwise XOR a character from the key based on the current position
				3. i/8 calculates index within the key for the current chunk of 8 bits.
				4. if length of key is met, then wrap around
		*/
		
		const decryptedChar = String.fromCharCode(
			decimalValue ^ key.charCodeAt(Math.floor(i / 8) % key.length)
		);

		// Append the decrypted character to the result string
		console.log("Appending decrypted character (8 bit chunk = 1 byte) to decrypted string...");
		decryptedText += decryptedChar;
	}

	return decryptedText;
}

/* Example run-through: */

console.log("---===[ Demo of nodejs XOR decryptor. ]===---");

// define the binary ciphertext
const xorEncryptedBinarySequence = "0111111001001110010001010000101000001011010110010111010001010001010101100101001001001111010010000000010000001011"; // Replace this with your actual XOR-encrypted binary sequence
console.log("The binary ciphertext: ", xorEncryptedBinarySequence);

// use the private key
const xorKey = "<<<key>>>";
console.log("The XOR key: ", xorKey);

// decrypt the binary ciphertext into plaintext
console.log("Calling the decryption function...");
const decryptedText = xorDecryptFromBinary(xorEncryptedBinarySequence, xorKey);

// output the final result
console.log("Decrypted Text:", decryptedText);
