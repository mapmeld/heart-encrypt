const assert = require('assert');
const encrypt = require('../heart-encrypt.js').encrypt;
const decrypt = require('../heart-encrypt.js').decrypt;

describe('encrypt', () => {
  it('encodes a basic phrase into hearts by default', (done) => {
    encrypt('hello world', (err, result) => {
      assert.equal(result, '💛💘❤️ 💛💖💘 💛💘💖 💛💘💖 💛💘💟 💖❤️ 💛💝💟 💛💘💟 💛💝💙 💛💘💖 💛💖💖');
      done();
    });
  });

  it('encodes a phrase with extra whitespace', (done) => {
    encrypt('   hello   world   ', (err, result) => {
      assert.equal(result, '💛💘❤️ 💛💖💘 💛💘💖 💛💘💖 💛💘💟 💖❤️ 💖❤️ 💖❤️ 💛💝💟 💛💘💟 💛💝💙 💛💘💖 💛💖💖');
      done();
    });
  });

  it('rejects a phrase with non-ASCII characters', (done) => {
    encrypt('hello 世界', (err, result) => {
      assert.equal(result, undefined);
      assert.equal(err, 'ASCII only');
      done();
    });
  });

  it('encodes a phrase with ternary emoji', (done) => {
    encrypt('watch out', (err, result) => {
      assert.equal(result, '😉😉😉😀🔫 😉😀😉🔫😉 😉😉😀🔫😉 😉😀😉🔫🔫 😉😀🔫😉😉 😉😀😉😉 😉😉😀😉😀 😉😉😀🔫🔫 😉😉😀🔫😉');
      done();
    }, { characters: ['😀', '😉', '🔫'] });
  });

  it('encodes a phrase with binary (A and B)', (done) => {
    encrypt('hello', (err, result) => {
      assert.equal(result, 'BBABAAA BBAABAB BBABBAA BBABBAA BBABBBB');
      done();
    }, { characters: ['A', 'B'] });
  });
});

describe('decrypt', () => {
  it('decodes a basic phrase', (done) => {
    decrypt('💛💛💖 💛💘💛 💛💘💜 💛💖💘 💖❤️ 💛💙💖 💛💘❤️ 💛💘💛 💛💝💜 💖❤️ 💛❤️💜 💛💘💟 💛💖💖 💛💖💘 ', (err, result) => {
      assert.equal(result, 'Like This Code');
      done();
    });
  });

  it('decodes a phrase with extra whitespace', (done) => {
    decrypt('  💛💘❤️ 💛💖💘 💛💘💖 💛💘💖 💛💘💟 💖❤️ 💖❤️ 💖❤️ 💛💝💟 💛💘💟 💛💝💙 💛💘💖 💛💖💖   ', (err, result) => {
      assert.equal(result, 'hello   world');
      done();
    });
  });

  it('decodes a binary phrase using A and B', (done) => {
    decrypt('BBABAAA BBAABAB BBABBAA BBABBAA BBABBBB', (err, result) => {
      assert.equal(result, 'hello');
      done();
    }, { characters: ['A', 'B'] });
  });
});
