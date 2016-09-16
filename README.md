# heart-encrypt

Encode ASCII messages with Emoji hearts or other characters

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

You can use a custom set of 2-10 different chatacters by adding an options parameter to both
functions.

In this release, the characters should be simple characters or emojis and not combined emojis (for example, national flags)

```javascript
encrypt('less cool', function (err, message) {
  console.log('custom message: ' + message);
}, { characters: ['😀', '😎'] });
```

## License

Open source, MIT license
