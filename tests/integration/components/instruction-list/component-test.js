import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
let SAMPLE_INSTRUCTIONS = {};

SAMPLE_INSTRUCTIONS[['0','S1']] = ['(', 'R', 'S2'];
SAMPLE_INSTRUCTIONS[['0','S2']] = ['1', 'R', 'S3'];
SAMPLE_INSTRUCTIONS[['0','S3']] = ['1', 'R', 'S4'];
SAMPLE_INSTRUCTIONS[['0','S4']] = ['+', 'R', 'S5'];
SAMPLE_INSTRUCTIONS[['0','S5']] = ['1', 'R', 'S6'];
SAMPLE_INSTRUCTIONS[['0','S6']] = ['1', 'R', 'S7'];
SAMPLE_INSTRUCTIONS[['0','S7']] = ['1', 'R', 'S8'];
SAMPLE_INSTRUCTIONS[['0','S8']] = [')', 'R', 'S9'];

moduleForComponent('tm-instructions', 'Integration | Component | instruction list', {
  integration: true
});

test('it renders the headers', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{tm-instructions instructions=instructions}}`);

  assert.equal(this.$('th').length, 5, 'Renders 5 headers');
});

test('it renders the condition headers', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{tm-instructions instructions=instructions}}`);

  assert.equal(this.$('th.condition').length, 2, 'Renders 2 condition headers');
});

test('it renders the condition cells', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{tm-instructions instructions=instructions}}`);

  assert.equal(this.$('td.condition').length, 2*Object.entries(SAMPLE_INSTRUCTIONS).length, 'Renders condition cells');
});

test('it renders the right text for condition headers', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{tm-instructions instructions=instructions}}`);

  assert.equal(this.$('th.condition:nth-of-type(1)').text().trim(), 'Match State', 'Renders match state header');
  assert.equal(this.$('th.condition:nth-of-type(2)').text().trim(), 'Match Value', 'Renders match value header');
});

test('it renders the right text for regular headers', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{tm-instructions instructions=instructions}}`);

  assert.equal(Ember.$(this.$('th:not(".condition")')[0]).text().trim(), 'New Value', 'Renders New Value header');
  assert.equal(Ember.$(this.$('th:not(".condition")')[1]).text().trim(), 'Tape Move', 'Renders Tape Move header');
  assert.equal(Ember.$(this.$('th:not(".condition")')[2]).text().trim(), 'New State', 'Renders New State header');
});

test('it renders the right text for condition cells', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{tm-instructions instructions=instructions}}`);

  assert.equal(Ember.$(this.$('td.condition:nth-of-type(1)')[0]).text().trim(), '0', 'Renders match state cell text');
  assert.equal(Ember.$(this.$('td.condition:nth-of-type(2)')[0]).text().trim(), 'S1', 'Renders match trigge text');
});

test('it renders the right text for regular cells', function(assert) {
  this.set('instructions', SAMPLE_INSTRUCTIONS);
  this.render(hbs`{{tm-instructions instructions=instructions}}`);

  assert.equal(Ember.$(this.$('td:not(".condition")')[0]).text().trim(), '(', 'Renders New Value cell text');
  assert.equal(Ember.$(this.$('td:not(".condition")')[1]).text().trim(), 'R', 'Renders Tape Move cell text');
  assert.equal(Ember.$(this.$('td:not(".condition")')[2]).text().trim(), 'S2', 'Renders New State cell text');
});
