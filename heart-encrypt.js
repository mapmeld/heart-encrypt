const bytePieces = ['A','B','C','D','E','F','G','H'];

function encrypt(message, callback, options) {
  if (!options || !options.characters) {
    options = { characters: bytePieces };
  }

  var output = '';
  for (var c = 0; c < message.length; c++) {
    var code = message.charCodeAt(c);

    if (code > 255) {
      return callback('ASCII only');
    }

    var placeVal = 1;
    while (code > options.characters.length) {
      code /= options.characters.length;
      placeVal++;
    }
    while (placeVal > 0) {
      var index = Math.floor(code);
      output += bytePieces[index];
      code = (code - index) * options.characters.length;
      placeVal--;
    }
    output += ' ';
  }
  callback(null, output);
}

function decrypt(message, callback, options) {
  if (!options || !options.characters) {
    options = { characters: bytePieces };
  }

  var output = '';
  var message = message.split(/\s+/);
  for (var c = 0; c < message.length; c++) {
    var code = 0;
    for (var c2 = 0; c2 < message[c].length; c2++) {
      code *= 10;
      code += bytePieces.indexOf(message[c][c2]);
    }
    var code = parseInt(code, options.characters.length);
    output += String.fromCharCode(code);
  }
  callback(null, output);
}

/*
encrypt('hello', (err, response) => {
  console.log(response);
});

decrypt('BFA BEF BFE BFE BFH', (err, response) => {
  console.log(response);
});
*/

if (typeof module !== 'undefined') {
  module.exports = {
    encrypt: encrypt,
    decrypt: decrypt
  };
}
