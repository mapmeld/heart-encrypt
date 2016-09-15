# heart-encrypt

Encode ASCII messages with Emoji hearts

## Usage

### Default

Encrypt and decrypt

```javascript
encrypt('hello', function(err, message) {
  console.log(message);
});

> 💛💘❤️ 💛💖💘 💛💘💖 💛💘💖 💛💘💟 

decrypt('💛💝💟 💛💘💟 💛💝💙 💛💘💖 💛💖💖 ', function(err, message) {
  console.log(message);
});

> "world"
```

### Custom

You can use a custom set of 2-10 Emojis by adding an options parameter to both
functions.

Do not use non-Emoji characters in this release.

```javascript
encrypt('less cool', function (err, message) {
  console.log('custom message: ' + message);
}, { characters: ['😀', '😎'] });
```

## License

Open source, MIT license
