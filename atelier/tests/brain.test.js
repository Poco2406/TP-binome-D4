import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateMessage, replyTo } from '../public/js/brain.js';

describe('validateMessage', () => {
  it('refuse une chaîne vide', () => {
    assert.equal(validateMessage('').ok, false);
  });

  it('accepte un message avec des espaces autour', () => {
  const resultat = validateMessage('  salut  ');
  assert.equal(resultat.ok, true);
  assert.equal(resultat.value, 'salut');
});

  it('refuse un message trop long', () => {
  assert.equal(validateMessage('a'.repeat(281)).ok, false);
});

  it('accepte un message de 280 caractères', () => {
  assert.equal(validateMessage('a'.repeat(280)).ok, true);
});

});

describe('replyTo', () => {
  it('reconnaît salut sans tenir compte des majuscules', () => {
    assert.deepEqual(replyTo('SALUT'), replyTo('salut'));
  });

  it('répond différemment à une phrase inconnue', () => {
  assert.notDeepEqual(replyTo('blablabla'), replyTo('aide'));
});
});
